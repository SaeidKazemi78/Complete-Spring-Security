package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing ShiftWork.
 */
@RestController
@RequestMapping("/testwcfservice")
public class BssResource {

    @GetMapping("/PK9_CheckDevice.aspx")
    @Timed
    public String getAllShiftWorks(
        @RequestParam(required = false) String DeviceSerial,
        @RequestParam(required = false) String DevicePassword
    ) {
  /*      System.out.println(DeviceSerial);
        System.out.println(DevicePassword);*/
        System.out.println("validate device");
        return "Content-Length:\r\n" +
            "\r\n" +
            "1424011\r\n" +
            "\r\n" +
            "<!DOCTYPE html>\r\n" +
            "\n" +
            "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
            "<head><title>\n" +
            "\n" +
            "</title></head>\n" +
            "<body>\n" +
            "    <form method=\"post\" action=\"./PK9_CheckDevice.aspx?DeviceSerial=pk202&amp;DevicePassword=P5MYVm4QGeBli%2fPv2CkAD8wzmU8%3d\" id=\"form1\">\n" +
            "<div class=\"aspNetHidden\">\n" +
            "<input type=\"hidden\" name=\"__VIEWSTATE\" id=\"__VIEWSTATE\" value=\"/wEPDwULLTE2MTY2ODcyMjlkZBbM1NqRcuiGJnphplmIBQkj8QVpZ6pK1rcS6Q9ONSND\" />\n" +
            "</div>\n" +
            "\n" +
            "<div class=\"aspNetHidden\">\n" +
            "\n" +
            "\t<input type=\"hidden\" name=\"__VIEWSTATEGENERATOR\" id=\"__VIEWSTATEGENERATOR\" value=\"D51C97F0\" />\n" +
            "</div>\n" +
            "    <div>\n" +
            "    \n" +
            "    </div>\n" +
            "    </form>\n" +
            "</body>\n" +
            "</html>";
    }

    @GetMapping("/PK9_authentication.aspx")
    @Timed
    public String authentication(
        @RequestParam(required = false) String DeviceId,
        @RequestParam(required = false) String charset
    ) {
      /*  System.out.println(DeviceId);
        System.out.println(UserRFID);
        System.out.println(Password);*/
        System.out.println("authenticate");

        return "1424011*2092377043 *142401";
    }

    /*138	412.082644799	192.168.43.150	192.168.43.74	HTTP	315	GET /testwcfservice/PK9_authentication.aspx?DeviceId=ontent-Type: text/plain;charset=UTF-8 Continuation*/

    @GetMapping("/PK9_Cond_View_Customer_By_RFID.aspx")
    @Timed
    public String findByRfId(
        @RequestParam(required = false) String DeviceId,
        @RequestParam(required = false) String UserId,
        @RequestParam(required = false) String RFID
    ) {
       /* System.out.println(DeviceId);
        System.out.println(UserId);
        System.out.println(RFID);*/
        System.out.println("findByRfId");

        return "14240123*33CDR49";
    }

    @GetMapping("/Insert_PK9_System.aspx")
    @Timed
    public String insert(
        @RequestParam(required = false) String SellPalceCode,
        @RequestParam(required = false) String CustomerCode,
        @RequestParam(required = false) String Transit,
        @RequestParam(required = false) String UseriD,
        @RequestParam(required = false) String DeviceId,
        @RequestParam(required = false) String Megdar
    ) {
   /*     System.out.println(SellPalceCode);
        System.out.println(CustomerCode);
        System.out.println(Transit);
        System.out.println(UseriD);
        System.out.println(DeviceId);
        System.out.println(Megdar);*/
        System.out.println("insert");

        return "14240115";
    }
}
