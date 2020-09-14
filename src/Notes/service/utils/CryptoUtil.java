package ir.donyapardaz.niopdc.base.service.utils;

import org.bouncycastle.crypto.*;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.crypto.engines.RijndaelEngine;
import org.bouncycastle.crypto.generators.PKCS12ParametersGenerator;
import org.bouncycastle.crypto.modes.CBCBlockCipher;
import org.bouncycastle.crypto.paddings.PKCS7Padding;
import org.bouncycastle.crypto.paddings.PaddedBufferedBlockCipher;
import org.bouncycastle.crypto.params.KeyParameter;
import org.bouncycastle.crypto.params.ParametersWithIV;
import org.bouncycastle.util.encoders.Base64;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;

public class CryptoUtil {


    private static String Encrypt(String text, String password) throws InvalidCipherTextException, UnsupportedEncodingException {
        byte[] pass = Arrays.copyOf(password.getBytes(), 16);
        byte[] iv = pass;

        PBEParametersGenerator keyGenerator = new PKCS12ParametersGenerator(new SHA256Digest());
        keyGenerator.init(pass, iv, 0);
        CipherParameters keyParams = new ParametersWithIV(new KeyParameter(pass, 0, 16), iv, 0, 16);


        BlockCipher engine = new RijndaelEngine(128);
        CBCBlockCipher cbc = new CBCBlockCipher(engine);
        BufferedBlockCipher cipher = new PaddedBufferedBlockCipher(cbc, new PKCS7Padding());

        cipher.init(true, keyParams);

        byte[] input = text.getBytes("UTF-8");
        byte[] cipherText = new byte[cipher.getOutputSize(input.length)];

        int cipherLength = cipher.processBytes(input, 0, input.length, cipherText, 0);
        cipher.doFinal(cipherText, cipherLength);

        String result = new String(Base64.encode(cipherText));
        return result;
    }

    private static String Decrypt(String text, String password) throws InvalidCipherTextException, UnsupportedEncodingException {
        byte[] pass = Arrays.copyOf(password.getBytes(), 16);
        byte[] iv = pass;

        PBEParametersGenerator keyGenerator = new PKCS12ParametersGenerator(new SHA256Digest());
        keyGenerator.init(pass, iv, 0);
        CipherParameters keyParams = new ParametersWithIV(new KeyParameter(pass, 0, 16), iv, 0, 16);


        BlockCipher engine = new RijndaelEngine(128);
        CBCBlockCipher cbc = new CBCBlockCipher(engine);
        BufferedBlockCipher cipher = new PaddedBufferedBlockCipher(cbc, new PKCS7Padding());

        cipher.init(false, keyParams);

        byte[] input = Base64.decode(text.getBytes("UTF-8"));
        byte[] cipherText = new byte[cipher.getOutputSize(input.length)];

        int cipherLength = cipher.processBytes(input, 0, input.length, cipherText, 0);
        int outputLength = cipher.doFinal(cipherText, cipherLength);
        outputLength += cipherLength;

        byte[] resultBytes = cipherText;
        if (outputLength != input.length) {
            resultBytes = new byte[outputLength];
            System.arraycopy(
                cipherText, 0,
                resultBytes, 0,
                outputLength
            );
        }
        String result = new String(resultBytes);
        return result;
    }


}
