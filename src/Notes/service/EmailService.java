package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.service.dto.EmailDTO;
import org.apache.commons.lang3.CharEncoding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.util.Locale;
@Service
public class EmailService {
    private final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final String USERNAME = "username";
    private final String BASE_URL = "baseUrl";
    private final String MESSAGE = "message";
    private final JavaMailSender javaMailSender;
    private final MessageSource messageSource;
    private final SpringTemplateEngine templateEngine;

    private String niopdcEmail="Tejaratasan@niopdc.ir";

    public EmailService(JavaMailSender javaMailSender, MessageSource messageSource, SpringTemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }


    public void sendEmail(EmailDTO emailDTO) {
        Locale locale = Locale.forLanguageTag(emailDTO.getLangKey());
        Context context = new Context(locale);

        context.setVariable(USERNAME, emailDTO.getUsername());
        context.setVariable(BASE_URL, "/");
        context.setVariable(MESSAGE,emailDTO.getMessage());
        String content = templateEngine.process(emailDTO.getTemplateName(), context);


        for (String email : emailDTO.getAddressList())
            sendEmail(email, emailDTO.getSubject(), content, false, true);


    }


    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, CharEncoding.UTF_8);
            message.setTo(to);
            message.setFrom(niopdcEmail);
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to  '{}'", to);
        } catch (Exception e) {
            if (log.isDebugEnabled()) {
                log.warn("Email could not be sent to user '{}'", to, e);
            } else {
                log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
            }
        }
    }


}
