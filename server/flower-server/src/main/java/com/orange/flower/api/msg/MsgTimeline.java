/*
 * Project:  flower
 * Module:   flower-server
 * File:     MsgTimeline.java
 * Modifier: nzhou
 * Modified: 2015-07-30 09:47
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg;

import org.hibernate.annotations.Comment;
import org.hibernate.annotations.Index;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.IdClass;
import javax.persistence.Table;

/**
 * 消息时间线
 */
@Entity
@IdClass(MsgTimelineKey.class)
@Table(name = "t_msg_timeline")
public class MsgTimeline extends MsgTimelineKey {
    private static final long serialVersionUID = -2962288521851035537L;

    @Column(name = "count0", precision = 5, nullable = false)
    @Comment("新消息数量")
    private int count;

    @Column(name = "inbox_msg_id", nullable = false)
    @Index(name = "idx_msgline_imsg")
    @Comment("最新收件编号")
    private long inboxMsgId;

    @Column(name = "update_at", nullable = false)
    @Comment("更新时间戳")
    private long updateAt;

    @Column(name = "title_biz",precision = 3, nullable = false)
    @Comment("会话标题业务类型")
    private int titleBiz;

    @Column(name = "title_biz_id", nullable = false)
    @Comment("会话标题业务对象编号")
    private long titleBizId;

    public MsgTimeline(long receiverId, long senderId) {
        super(receiverId, senderId);
    }

    public MsgTimeline() {
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public long getInboxMsgId() {
        return inboxMsgId;
    }

    public void setInboxMsgId(long inboxMsgId) {
        this.inboxMsgId = inboxMsgId;
    }

    public long getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(long updateAt) {
        this.updateAt = updateAt;
    }

    public int getTitleBiz() {
        return titleBiz;
    }

    public void setTitleBiz(int titleBiz) {
        this.titleBiz = titleBiz;
    }

    public long getTitleBizId() {
        return titleBizId;
    }

    public void setTitleBizId(long titleBizId) {
        this.titleBizId = titleBizId;
    }
}
