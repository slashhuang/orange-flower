/*
 * Project:  flower
 * Module:   flower-server
 * File:     EventType.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin.request.event;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2014/12/2
 */
public enum EventType {
    subscribe,SCAN,LOCATION,CLICK,VIEW;

    public static EventType findByName(String name){
        if ("subscribe".equals(name)){
            return subscribe;
        } else if ("SCAN".equals(name)){
            return SCAN;
        } else if ("LOCATION".equals(name)){
            return LOCATION;
        } else if ("CLICK".equals(name)){
            return CLICK;
        } else {
            return VIEW;
        }
    }
}
