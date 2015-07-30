/*
 * Project:  flower
 * Module:   flower-server
 * File:     MsgTimelineKey.java
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

import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Comment;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

/**
 * <p/>
 *
 * @author <a href="mailto:xyang@wisorg.com">xyang</a>
 * @version V1.0, 14-8-15
 */
@MappedSuperclass
public class MsgTimelineKey implements Serializable {
    private static final long serialVersionUID = -4590082187631160514L;

    @Id
    @Column(name = "main_id", nullable = false)
    @Comment("主用户编号")
    private long mainId;

    @Id
    @Column(name = "other_id", nullable = false)
    @Comment("从用户编号")
    private long otherId;

    public MsgTimelineKey(long mainId, long otherId) {
        this.mainId = mainId;
        this.otherId = otherId;
    }

    public MsgTimelineKey() {
    }

    public long getMainId() {
        return mainId;
    }

    public void setMainId(long mainId) {
        this.mainId = mainId;
    }

    public long getOtherId() {
        return otherId;
    }

    public void setOtherId(long otherId) {
        this.otherId = otherId;
    }

    @Override
    public int hashCode() {
        return (int) (mainId * 37 + otherId);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof MsgTimelineKey) {
            MsgTimelineKey other = (MsgTimelineKey) obj;
            return mainId == other.mainId && otherId == other.otherId;
        }
        return false;
    }

    @Override
    public String toString() {
        return StringUtils.join(new Object[]{mainId, otherId}, '-');
    }
}
