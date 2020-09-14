package ir.donyapardaz.niopdc.base.service.remote.sabteahval.offlineinquiry;

import ir.donyapardaz.niopdc.base.domain.PersonInquiry;
import ir.donyapardaz.niopdc.base.domain.PersonInquiryRequest;
import ir.donyapardaz.niopdc.base.domain.enumeration.PersonInquiryStatus;
import ir.donyapardaz.niopdc.base.service.PersonInquiryService;
import ir.donyapardaz.niopdc.base.service.dto.PersonInquiryDTO;
import ir.donyapardaz.niopdc.base.service.mapper.PersonInquiryMapper;
import ir.donyapardaz.niopdc.base.service.utils.ObjectUtils;
import ir.donyapardaz.niopdc.base.web.rest.AirplaneModelResource;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.mail.util.ByteArrayDataSource;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.rmi.RemoteException;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 *
 */
@Component
public class PersonOfflineInquiryClient {

    private final Logger log = LoggerFactory.getLogger(PersonOfflineInquiryClient.class);
    @Value("${remote.sabteahval.offlineinquiry.username}")
    String username;
    @Value("${remote.sabteahval.offlineinquiry.password}")
    String password;

    private final FileTransferStub stub;
    private final PersonInquiryService personInquiryService;
    private final PersonInquiryMapper personInquiryMapper;

    /**
     * @param stub
     * @param personInquiryService
     * @param personInquiryMapper
     */
    public PersonOfflineInquiryClient(FileTransferStub stub, PersonInquiryService personInquiryService, PersonInquiryMapper personInquiryMapper) {
        this.stub = stub;
        this.personInquiryService = personInquiryService;
        this.personInquiryMapper = personInquiryMapper;
    }

    /**
     * @throws Exception
     */
    public void sendPersonInfo() throws Exception {

        final ByteArrayOutputStream output = new ByteArrayOutputStream();

        PersonInquiryRequest personInquiryRequest = new PersonInquiryRequest();
        personInquiryRequest.setFilename(String.valueOf(Instant.now().toEpochMilli()));
        personInquiryRequest.setRequestTime(ZonedDateTime.now());

        List<PersonInquiryStatus> status = new ArrayList<>();
        status.add(PersonInquiryStatus.REQUEST);

        Set<PersonInquiry> personInquiryList = personInquiryService.findAllPersonByRequestStatus(status);


        this.send(personInquiryList, String.valueOf(Instant.now().toEpochMilli()), new FileTransferCallbackHandler() {

            @Override
            public void receiveResultupload(FileTransferStub.UploadResponse re) {
                String result = re.getResult();

                personInquiryRequest.setResult(result);
                if (ObjectUtils.nonEmpty(result)) {
                    personInquiryRequest.setFailed(true);
                    personInquiryRequest.setFailedCount((personInquiryRequest.getFailedCount() + 1));

                } else {
                    personInquiryRequest.setFailed(false);

                }


                Set<PersonInquiry> personInquiries = personInquiryList.stream()
                    .map(personInquiry -> {
                        if (!ObjectUtils.nonEmpty(result)) {
                            personInquiry.setStatus(PersonInquiryStatus.WAITING);
                        } else {
                            personInquiry.setStatus(PersonInquiryStatus.FAILED);
                        }
                        personInquiry.setInquiryTime(ZonedDateTime.now());

                        return personInquiry;
                    }).collect(Collectors.toSet());
                personInquiryRequest.setPersonInquiries(personInquiries);

                personInquiryService.saveRequest(personInquiryRequest);
                personInquiryService.updateAllPersonInquiry(personInquiries);

            }
        });
    }


    /**
     *
     *
     */
    public void resendFailedRequest() {
        List<PersonInquiryRequest> requestList = personInquiryService.getAllFailedPersonInquiryRequest();

        if (ObjectUtils.nonEmpty(requestList)) {

            requestList.stream().forEach(personInquiryRequest -> {

                try {
                    this.send(personInquiryRequest.getPersonInquiries(), personInquiryRequest.getFilename(), new FileTransferCallbackHandler() {

                        @Override
                        public void receiveErrorupload(Exception e) {
                            super.receiveErrorupload(e);
                            e.printStackTrace();
                        }

                        @Override
                        public void receiveResultupload(FileTransferStub.UploadResponse re) {
                            super.receiveResultupload(re);

                            String result = re.getResult();
                            personInquiryRequest.setResult(result);
                            if (ObjectUtils.nonEmpty(result)) {
                                personInquiryRequest.setFailed(true);
                                personInquiryRequest.setFailedCount((personInquiryRequest.getFailedCount() + 1));
                            } else personInquiryRequest.setFailed(false);


                            Set<PersonInquiry> personInquiries = personInquiryRequest.getPersonInquiries().stream()
                                .map(personInquiry -> {
                                    if (!ObjectUtils.nonEmpty(result)) {
                                        personInquiry.setStatus(PersonInquiryStatus.WAITING);
                                    } else {
                                        personInquiry.setStatus(PersonInquiryStatus.FAILED);
                                    }
                                    personInquiry.setInquiryTime(ZonedDateTime.now());

                                    return personInquiry;
                                }).collect(Collectors.toSet());
                            personInquiryRequest.setPersonInquiries(personInquiries);

                            personInquiryService.saveRequest(personInquiryRequest);
                            personInquiryService.updateAllPersonInquiry(personInquiries);
                        }
                    });
                } catch (RemoteException e) {
                    e.printStackTrace();
                }
            });
        }

    }

    /**
     * @throws UnsupportedEncodingException
     */
    public void getPersonInfo()  {

        FileTransferStub.Download download = new FileTransferStub.Download();
        download.setString(username);
        download.setString0(password);




        List<PersonInquiryRequest> requestList = this.personInquiryService.findAllWaitAfter30m();

        if (ObjectUtils.nonEmpty(requestList)) {

            for (int index = 0; index < 20; index++) {
                try {
                    FileTransferStub.DownloadResponse response = this.stub.download(download);


                    FileTransferStub.TransferInfo result = response.getResult();
                    Optional<PersonInquiryRequest> request = requestList.stream().filter(personInquiryRequest -> personInquiryRequest.getFilename()
                        .equals(result.getFilename())).findFirst();

                    if (ObjectUtils.nonEmpty(result.getFilename())) {


                        Set<PersonInquiry> personInquiryList = new HashSet<>();
                        String[] split = result.getData().split("\n");
                        for (String data : split){

                            PersonInquiryDTO inquiryDTO = this.extractPerson(data);
                            log.info("result of inquiry offline : ",inquiryDTO);

                        }


                        if (request.isPresent()) {

                            this.personInquiryService.updateAllPersonInquiry(personInquiryList);
                            PersonInquiryRequest personInquiryRequest = request.get();
                            personInquiryRequest.setResponseTime(ZonedDateTime.now());
                            this.personInquiryService.saveRequest(personInquiryRequest);

                        } else {

                          //  this.personInquiryService.saveAll(personInquiryList);
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }

    }



    public void test()  {

        FileTransferStub.Download download = new FileTransferStub.Download();
        download.setString(username);
        download.setString0(password);



                try {
                    FileTransferStub.DownloadResponse downloadResponse = this.stub.download(download);


                    FileTransferStub.TransferInfo transferInfo = downloadResponse.getResult();


                    if (ObjectUtils.nonEmpty(transferInfo.getFilename())) {

                        String[] split = transferInfo.getData().split("\n");
                        for (String data : split){

                            PersonInquiryDTO inquiryDTO = this.extractPerson(data);
                            log.info("result of inquiry offline : ",inquiryDTO);

                        }


                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }


    }


    /**
     * @param personInquiryList
     * @param fileName
     * @param callbackHandler
     * @throws RemoteException
     */
    private void send(Set<PersonInquiry> personInquiryList, String fileName, FileTransferCallbackHandler callbackHandler) throws RemoteException {

        String output="";

        if (ObjectUtils.nonEmpty(personInquiryList)) {
            personInquiryList.stream().map(personInquiry -> {

                if (ObjectUtils.nonEmpty(personInquiry.getNationalCode()))
                    personInquiry.setNationalCode(personInquiry.getNationalCode().replaceAll("\\s+", ""));

                if (ObjectUtils.nonEmpty(personInquiry.getFirstName()))
                    personInquiry.setFirstName(personInquiry.getFirstName().replaceAll("\\s+", ""));

                if (ObjectUtils.nonEmpty(personInquiry.getLastName()))
                    personInquiry.setLastName(personInquiry.getLastName().replaceAll("\\s+", ""));

                if (ObjectUtils.nonEmpty(personInquiry.getFatherName()))
                    personInquiry.setFatherName(personInquiry.getFatherName().replaceAll("\\s+", ""));

                if (ObjectUtils.nonEmpty(personInquiry.getIdCode()))
                    personInquiry.setIdCode(personInquiry.getIdCode().replaceAll("\\s+", ""));

                if (ObjectUtils.nonEmpty(personInquiry.getAlphabetClassified()))
                    personInquiry.setAlphabetClassified(personInquiry.getAlphabetClassified().replaceAll("\\s+", ""));
                if (ObjectUtils.nonEmpty(personInquiry.getClassified()))
                    personInquiry.setClassified(personInquiry.getClassified().replaceAll("\\s+", ""));

                if (ObjectUtils.nonEmpty(personInquiry.getConsecutive()))
                    personInquiry.setConsecutive(personInquiry.getConsecutive().replaceAll("\\s+", ""));

                return personInquiry;
            }).forEach(person -> {

                output.concat(String.valueOf(person.getId()) + ",");

                if (ObjectUtils.nonEmpty(person.getFirstName()))
                    output.concat(person.getFirstName() + ",");
                else output.concat(",");

                if (ObjectUtils.nonEmpty(person.getLastName()))
                    output.concat(person.getLastName() + ",");
                else output.concat(",");

                if (ObjectUtils.nonEmpty(person.getFatherName()))
                    output.concat(person.getFatherName());
                else output.concat(",");

                if (ObjectUtils.nonEmpty(person.getIdCode()))
                    output.concat(person.getIdCode());
                else output.concat(",");

                if (ObjectUtils.nonNull(person.getBirthday()))
                    output.concat((DateUtil.convertToPersianByFormat(person.getBirthday(), "YYYYMMDD")
                        .replace("\\", "") + ","));
                else output.concat(",");

                if (ObjectUtils.nonEmpty(person.getAlphabetClassified()) && ObjectUtils.nonEmpty(person.getClassified()))
                    output.concat(person.getAlphabetClassified() + person.getClassified() + ",");
                else output.concat(",");

                if (ObjectUtils.nonEmpty(person.getConsecutive()))
                    output.concat(person.getConsecutive() + ",");
                else output.concat(",");

                if (ObjectUtils.nonEmpty(person.getNationalCode()))
                    output.concat(person.getNationalCode());
                else output.concat(",");

                output.concat("\n");

            });


            FileTransferStub.Upload upload = new FileTransferStub.Upload();

            upload.setString(username);
            upload.setString0(password);


            FileTransferStub.TransferInfo rowFile = new FileTransferStub.TransferInfo();
/*  try {
      System.out.print(new String(output.toByteArray(), "UTF-8"));
  }catch (Exception e){
      e.printStackTrace();
  }*/

            rowFile.setData(Arrays.toString(Base64.getEncoder().encode(output.getBytes())));






            rowFile.setFilename(fileName);
            rowFile.setIndex(0);


            upload.setTransferInfo(rowFile);


            this.stub.startupload(upload, callbackHandler);
        }

    }

    /**
     * @param info
     * @return
     */
    private PersonInquiryDTO extractPerson(String info) {
        PersonInquiryDTO personInquiryDTO = new PersonInquiryDTO();
        List<String> listInfo = Arrays.asList(info.split(","));

        personInquiryDTO.setId(Long.parseLong(listInfo.get(0)));
        personInquiryDTO.setNationalCode(listInfo.get(1));
        personInquiryDTO.setAlive(!listInfo.get(2).equals("x"));
        personInquiryDTO.setFirstName(listInfo.get(3));
        personInquiryDTO.setLastName(listInfo.get(4));
        personInquiryDTO.setFatherName(listInfo.get(5));
        personInquiryDTO.setIdCode(listInfo.get(6));


        if (Objects.nonNull(listInfo.get(7)) && !listInfo.get(7).equals("")) {
            YearMonthDay yearMonthDay = new YearMonthDay(
                listInfo.get(7).substring(0, 4),
                listInfo.get(7).substring(4, 6),
                listInfo.get(7).substring(6, 8));

            personInquiryDTO.setBirthday(DateUtil.convertToGeorgian(yearMonthDay));
        }

        personInquiryDTO.setDescription(listInfo.get(8));

        return personInquiryDTO;

    }
}
