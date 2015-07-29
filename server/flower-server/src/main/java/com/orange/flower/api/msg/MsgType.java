/*
 * Project:  flower-service
 * Module:   flower-server
 * File:     MsgType.java
 * Modifier: nzhou
 * Modified: 2015-07-28 12:37
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.msg;

import com.orange.flower.core.bean.Titleable;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/28
 */
public enum MsgType implements Titleable {
    INBOX("站内信"),MSG("短信"),EMAIL("邮件"),PUSH("推送"),WEIXIN("微信模板消息");

    private final String title;

    MsgType(String title){
        this.title = title;
    }

    @Override
    public String getTitle() {
        return title;
    }
}
