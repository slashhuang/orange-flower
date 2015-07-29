/*
 * Project:  flower
 * Module:   flower-server
 * File:     ReplyCase.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin;

import com.orange.flower.core.bean.Titleable;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/4/24
 */
public enum ReplyCase implements Titleable{
    KEYWORD("包含关键词"),
    SUBSCRIBE("订阅时");
    private String title;

    ReplyCase(String title) {
        this.title = title;
    }

    public String getTitle() {
        return this.title;
    }
}
