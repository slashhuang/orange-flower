/*
 * Project:  flower-service
 * Module:   flower-server
 * File:     MsgBuilder.java
 * Modifier: nzhou
 * Modified: 2015-07-28 17:44
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg;

import com.google.common.collect.Lists;
import com.orange.flower.core.Constants;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Map;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/28
 */
public class MsgBuilder {

    private Collection<Long> receivers = Lists.newArrayList();
    private long sender;
    private MsgType msgType;
    private String body;
    private String tpl;
    private Map<String, Object> tplArgs;

    public MsgBuilder to(Collection<Long> receivers) {
        this.receivers.addAll(receivers);
        return this;
    }

    public MsgBuilder to(long... receivers) {
        for (long receiver : receivers) {
            this.receivers.add(receiver);
        }
        return this;
    }

    public MsgBuilder inbox(String body) {
        return newBuilder(body).msgType(MsgType.INBOX).from(Constants.INBOX_USER);
    }

    private MsgBuilder body(String body) {
        this.body = body;
        return this;
    }

    public MsgBuilder msg(String body) {
        return newBuilder(body).msgType(MsgType.MSG);
    }

    public MsgBuilder email(String body) {
        return newBuilder(body).msgType(MsgType.EMAIL).from(0);
    }

    private MsgBuilder newBuilder(String body){
        return new MsgBuilder().body(body);
    }

    public MsgBuilder from(long sender) {
        this.sender = sender;
        return this;
    }

    private MsgBuilder msgType(MsgType msgType) {
        this.msgType = msgType;
        return this;
    }

    public MsgBuilder tpl(String tpl,Map<String,Object> tplArgs){
        this.tpl = tpl;
        this.tplArgs = tplArgs;
        return this;
    }

    public Msg build() {
        Assert.isTrue(sender > 0, "Sender must not be null");
        Assert.isTrue(!CollectionUtils.isEmpty(receivers), "Receivers must not be empty");
        Msg msg = new Msg();
        msg.setMsgType(msgType);
        msg.setSenderId(sender);
        msg.setBody(body);
        if (!StringUtils.isEmpty(tpl)) {
            //TODO render tpl and set body
        }
        Assert.isTrue(StringUtils.hasText(body) || StringUtils.hasText(tpl), "Body or tpl must not be empty");
        msg.setSendAt(System.currentTimeMillis());
        return msg;
    }

    public Collection<Long> getReceivers() {
        return receivers;
    }
}
