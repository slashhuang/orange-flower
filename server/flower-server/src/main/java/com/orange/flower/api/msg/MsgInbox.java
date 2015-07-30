/*
 * Project:  flower
 * Module:   flower-server
 * File:     Msgs.java
 * Modifier: nzhou
 * Modified: 2015-07-30 09:37
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/30
 */
public class MsgInbox implements Serializable {

    @Id
    private Long id;

    private long senderId;

    private long receiverId;

    @ManyToOne
    @JoinColumn(name = "msg_id", insertable = false, updatable = false)
    private Msg msg;
}
