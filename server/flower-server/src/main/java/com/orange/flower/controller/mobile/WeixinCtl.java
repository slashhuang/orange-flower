/*
 * Project:  flower
 * Module:   flower-server
 * File:     WeixinCtl.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:29
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.controller.mobile;

import com.google.common.base.Charsets;
import com.google.common.hash.Hashing;
import com.orange.flower.api.weixin.request.RequestHandler;
import com.orange.flower.api.weixin.response.Resp;
import com.orange.flower.api.weixin.util.XMLUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/29
 */
@Controller
@RequestMapping("/wx")
public class WeixinCtl {
    @Autowired(required = false)
    private RequestHandler requestHandler;

    @Value("${sns.weixin.token}")
    private String weixinToken;

    @RequestMapping(method = RequestMethod.GET, value = "/")
    @ResponseBody
    public String checkSignature(String signature, String timestamp, String nonce, String echostr) {
        String[] arr = new String[]{weixinToken, timestamp, nonce};
        Arrays.sort(arr);
        if (signature.equalsIgnoreCase(Hashing.sha1().hashString(StringUtils.join(arr), Charsets.UTF_8).toString())) {
            return echostr;
        }
        return "false";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/")
    @ResponseBody
    public String handle(HttpServletRequest request) {
        try {
            Resp resp = requestHandler.handle(XMLUtil.parse(request.getInputStream()));
            return XMLUtil.toXML(resp);
        } catch (Exception e) {
            return StringUtils.EMPTY;
        }
    }
}
