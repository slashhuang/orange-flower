/*
 * Project:  flower
 * Module:   flower-server
 * File:     JsApiConfig.java
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

import com.orange.flower.core.util.Codecs;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;

public final class JsApiConfig implements Serializable {
    private static final String SIGN_STR = "jsapi_ticket=%s&noncestr=%s&timestamp=%d&url=%s";

    private String appId;
    private long timestamp;
    private String nonceStr;
    private String signature;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public String getNonceStr() {
        return nonceStr;
    }

    public void setNonceStr(String nonceStr) {
        this.nonceStr = nonceStr;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public void sign(String ticket, String url) {
        setSignature(Codecs.sha1Hex(String.format(SIGN_STR, ticket, nonceStr, timestamp, url)));
    }
}
