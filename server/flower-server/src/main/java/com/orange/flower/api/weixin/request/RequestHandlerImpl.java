/*
 * Project:  flower
 * Module:   flower-server
 * File:     RequestHandlerImpl.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin.request;

import com.alibaba.fastjson.util.TypeUtils;
import com.orange.flower.api.weixin.request.event.Event;
import com.orange.flower.api.weixin.request.event.EventHandler;
import com.orange.flower.api.weixin.request.event.EventType;
import com.orange.flower.api.weixin.request.msg.MsgHandler;
import com.orange.flower.api.weixin.request.msg.MsgType;
import com.orange.flower.api.weixin.response.Resp;
import com.orange.flower.api.weixin.util.Constants;

import java.lang.reflect.ParameterizedType;
import java.util.Map;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2014/12/3
 */
public class RequestHandlerImpl implements RequestHandler {

    private Iterable<? extends EventHandler> eventHandlers;

    private Iterable<? extends MsgHandler> msgHandlers;

    public void setEventHandlers(Iterable<? extends EventHandler> eventHandlers) {
        this.eventHandlers = eventHandlers;
    }

    public void setMsgHandlers(Iterable<? extends MsgHandler> msgHandlers) {
        this.msgHandlers = msgHandlers;
    }

    @Override
    public Resp handle(Map<String, String> requestMap) {
        Resp resp = null;
        if (requestMap.containsKey(Constants.EVENT)) {
            //handle event
            EventType eventType = EventType.findByName(requestMap.get(Constants.EVENT));
            for (EventHandler eventHandler : eventHandlers) {
                if (eventHandler.support(eventType)) {
                    resp = eventHandler.handle((Event) TypeUtils.castToJavaBean(requestMap, getType(eventHandler.getClass())));
                    if (resp != null) {
                        break;
                    }
                }
            }
        } else {
            //handle message
            MsgType msgType = MsgType.findByName(requestMap.get(Constants.MSG_TYPE));
            for (MsgHandler msgHandler : msgHandlers) {
                if (msgHandler.support(msgType)) {
                    resp = msgHandler.handle((Req) TypeUtils.castToJavaBean(requestMap, getType(msgHandler.getClass())));
                    if (resp != null) {
                        break;
                    }
                }
            }
        }
        return resp;
    }

    private Class getType(Class clazz) {
        return (Class) ((ParameterizedType) clazz.getGenericInterfaces()[0]).getActualTypeArguments()[0];
    }
}
