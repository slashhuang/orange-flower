/*
 * Project:  flower-service
 * Module:   flower-server
 * File:     MessageServiceImpl.java
 * Modifier: nzhou
 * Modified: 2015-07-28 17:42
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg.impl;

import com.orange.flower.api.msg.*;

import java.util.List;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/28
 */
public class MsgServiceImpl implements MsgService {

    private List<MsgProvider> msgProviders;

    private MsgRepo msgRepo;

    @Override
    public int sendMsg(MsgBuilder msgBuilder) {
        Msg msg = msgBuilder.build();

        //save msg
        msgRepo.save(msg);


        for (MsgProvider msgProvider : msgProviders) {
            if (msgProvider.supports(msg.getMsgType())) {
                msgProvider.sendMsg(msg);
                break;
            }
        }
        return 0;
    }
}
