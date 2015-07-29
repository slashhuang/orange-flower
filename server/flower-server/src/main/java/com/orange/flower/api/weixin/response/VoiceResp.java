/*
 * Project:  flower
 * Module:   flower-server
 * File:     VoiceResp.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin.response;

import com.thoughtworks.xstream.annotations.XStreamAlias;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2014/12/5
 */
@XmlRootElement(name = "xml")
@XmlAccessorType(XmlAccessType.FIELD)
public class VoiceResp extends Resp {
    public VoiceResp() {
        MsgType = RespType.voice;
    }

    @XStreamAlias("Voice")
    public com.orange.flower.api.weixin.response.item.Voice Voice;
}
