/*
 * Project:  flower
 * Module:   flower-server
 * File:     Music.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin.response.item;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2014/12/5
 */
@XmlRootElement(name = "Music")
@XmlAccessorType(XmlAccessType.FIELD)
public class Music {
    @XmlElement(name = "Title")
    public String Title;
    @XmlElement(name = "Description")
    public String Description;
    @XmlElement(name = "MusicUrl")
    public String MusicUrl;
    @XmlElement(name = "HQMusicUrl")
    public String HQMusicUrl;
    @XmlElement(name = "ThumbMediaId")
    public String ThumbMediaId;
}
