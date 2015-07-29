/*
 * Project:  flower
 * Module:   flower-server
 * File:     MsgType.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin.request.msg;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2014/12/2
 */
public enum MsgType {
    text, image, voice, video, location, link ,event;
    public static MsgType findByName(String name) {
        if ("text".equals(name)) {
            return text;
        } else if ("image".equals(name)) {
            return image;
        } else if ("voice".equals(name)) {
            return voice;
        } else if ("video".equals(name)) {
            return video;
        } else if ("location".equals(name)) {
            return location;
        } else if ("event".equals(name)){
            return event;
        } else {
            return link;
        }
    }
}
