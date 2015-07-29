/*
 * Project:  flower
 * Module:   flower-server
 * File:     Msg.java
 * Modifier: nzhou
 * Modified: 2015-07-29 11:15
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/28
 */
@Entity
@Table(name = "t_msg")
public class Msg implements Serializable{
    @Id
    @GeneratedValue
    private Long id;

    private long sender;
    private String body;
    private long createAt;
    private MsgType msgType;

    public void setSender(long sender) {
        this.sender = sender;
    }

    public long getSender() {
        return sender;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getBody() {
        return body;
    }

    public void setCreateAt(long createAt) {
        this.createAt = createAt;
    }

    public long getCreateAt() {
        return createAt;
    }

    public MsgType getMsgType() {
        return msgType;
    }

    public void setMsgType(MsgType msgType) {
        this.msgType = msgType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
