/*
 * Project:  flower
 * Module:   flower-server
 * File:     TestCtl.java
 * Modifier: nzhou
 * Modified: 2015-07-22 17:14
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package demo.controller;

import demo.api.user.User;
import demo.api.user.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/22
 */
@EnableAutoConfiguration
@Controller
@RequestMapping("/first")
public class FirstCtl {

    @Autowired
    private UserService userService;

    @RequestMapping
    @ResponseBody
    public String index() {
        return "Hello world !";
    }

    @RequestMapping("/list")
    public void list(Model model) {
        User u = new User();
        u.setName(RandomStringUtils.random(6, 'a', 'e', 'i', 'o', 'u'));
        userService.save(u);
        model.addAttribute("users", userService.findAll());
    }
}
