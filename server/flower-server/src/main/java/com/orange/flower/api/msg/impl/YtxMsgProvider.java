/*
 * Project:  flower
 * Module:   flower-server
 * File:     YtxMsgProvider.java
 * Modifier: nzhou
 * Modified: 2015-07-29 12:54
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg.impl;

import com.orange.flower.api.msg.Msg;
import com.orange.flower.api.msg.MsgType;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/29
 */
@Component
public class YtxMsgProvider{

    @Value("${ytx.accountSid}")
    private String accountSid;

    @Value("${ytx.authToken}")
    private String authToken;

    @Value("${ytx.restUrl}")
    private String restUrl;

    @Value("${ytx.msgTplId}")
    private String msgTplId = "0";

    @RabbitListener(queues = "someQueue")
    public void processMessage(String content) {
        // ...
    }
}
