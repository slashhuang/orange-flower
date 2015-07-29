/*
 * Project:  flower
 * Module:   flower-server
 * File:     WeixinReply.java
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

import com.google.common.collect.Lists;
import com.orange.flower.core.hibernate.JSONType;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/4/23
 */
@Entity
@Table(name = "t_weixin_reply")
public class WeixinReply implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 180)
    private String title = StringUtils.EMPTY;

    @Type(type = JSONType.TYPE)
    @Column(length = 300)
    private List<String> keywords = Lists.newArrayList();

    @Column(length = 4000, nullable = false)
    private String body;

    @Column(precision = 3, nullable = false)
    private ReplyCase rcase = ReplyCase.KEYWORD;

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public ReplyCase getRcase() {
        return rcase;
    }

    public void setRcase(ReplyCase rcase) {
        this.rcase = rcase;
    }
}
