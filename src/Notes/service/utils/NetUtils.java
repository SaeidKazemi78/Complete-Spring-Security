package ir.donyapardaz.niopdc.base.service.utils;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.*;

public class NetUtils {

   /* String path = url.getFile().substring(0, url.getFile().lastIndexOf('/'));
    String base = url.getProtocol() + "://" + url.getHost() + path;*/

    public static Boolean sendPing(String ipAddress) throws UnknownHostException, IOException {
        InetAddress geek = InetAddress.getByName(getIp(ipAddress).getHostAddress());
        return  geek.isReachable(5000);
    }

    public static InetAddress getIp(String url) throws MalformedURLException, UnknownHostException {
        return InetAddress.getByName(new URL(url)
            .getHost());
    }

    public static String getSystemIpAddress() throws UnknownHostException {
        InetAddress localhost = InetAddress.getLocalHost();
        return (localhost.getHostAddress()).trim();
    }

    public static String getPublicSystemIpAddress() throws UnknownHostException, MalformedURLException, IOException {
        URL url_name = new URL("http://bot.whatismyipaddress.com");

        BufferedReader sc =
            new BufferedReader(new InputStreamReader(url_name.openStream()));

        return sc.readLine().trim();
    }


    public static Boolean telnet(URL url) {
        Socket pingSocket = null;
        PrintWriter out = null;
        BufferedReader in = null;
        String result = null;

        try {
            pingSocket = new Socket(url.getHost(), url.getPort());
            out = new PrintWriter(pingSocket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(pingSocket.getInputStream()));
            out.println("ping");
            result = in.readLine();
            out.close();
            in.close();
            pingSocket.close();
        } catch (Exception e) {
            return false;
        }
        return result!= null;
    }

    public static Boolean isConnect(URL url) {
        try {
                URLConnection connection = url.openConnection();
            connection.setReadTimeout(5*1000);
            connection.connect();
            return true;
        } catch (Exception ex) {
            return false;
        }

    }

    public static  String getBaseUrl(String url) throws Exception{
        URL mUrl = new URL(url);
          return mUrl.getProtocol()+"://"+mUrl.getHost();
    }
}
