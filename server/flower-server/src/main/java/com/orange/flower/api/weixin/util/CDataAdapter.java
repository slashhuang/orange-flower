/*
 * Project:  flower
 * Module:   flower-server
 * File:     CDataAdapter.java
 * Modifier: nzhou
 * Modified: 2015-07-29 14:22
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.api.weixin.util;

import javax.xml.bind.annotation.adapters.XmlAdapter;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2014/12/5
 */
public class CDataAdapter extends XmlAdapter<String, String> {
    @Override
    public String marshal(String str) throws Exception {
        return "<![CDATA[" + str + "]]>";
    }

    @Override
    public String unmarshal(String str) throws Exception {
        return str;
    }
}
