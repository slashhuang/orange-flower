/*
 * Project:  flower
 * Module:   flower-server
 * File:     Sms.java
 * Modifier: nzhou
 * Modified: 2015-07-30 14:05
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg;

import com.wisorg.msc.core.bean.Bodyable;
import com.wisorg.msc.core.bean.Idable;
import com.wisorg.msc.core.support.hibernate.SnowflakeGenerator;
import com.wisorg.msc.openapi.type.TStatus;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 存放发送的短信内容
 * 
 * @author <a href="mailto:njit_wangsikai@126.com">skwang</a>
 * @since 2014年10月15日
 */
@Entity
@Table(name = "t_sms")
@Comment("短信")
public class Sms implements Serializable {
    private static final long serialVersionUID = -8839132847565888699L;

    @Id
    @GeneratedValue(generator = "snowflake")
    @Comment("编号")
    private Long id;

    @Column(name = "body", length = 2048)
    @Comment("内容")
    private String body;

    @Column(name = "mobiles", length = 8000)
    @Comment("接受手机号码")
    private String receivers;

    @Column(name = "sender_at", nullable = false)
    @Comment("发送时间戳")
    private long sendAt;

    @Column(name = "channel", length = 64)
    @Comment("网关/通道")
    private String channel;

    @Column(name = "sender_id", nullable = false)
    @Comment("发送人编号")
    private long senderId;

    @Column(name = "count")
    @Comment("发送条数")
    private int count;

    @Column(name = "purpose", length = 256)
    @Comment("发送用途")
    private String purpose;

    @Column(precision = 3, nullable = false)
    @Comment("状态")
    private TStatus status = TStatus.ENABLED;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getReceivers() {
        return receivers;
    }

    public void setReceivers(String receivers) {
        this.receivers = receivers;
    }

    public long getSendAt() {
        return sendAt;
    }

    public void setSendAt(long sendAt) {
        this.sendAt = sendAt;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public long getSenderId() {
        return senderId;
    }

    public void setSenderId(long senderId) {
        this.senderId = senderId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public TStatus getStatus() {
        return status;
    }

    public void setStatus(TStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}