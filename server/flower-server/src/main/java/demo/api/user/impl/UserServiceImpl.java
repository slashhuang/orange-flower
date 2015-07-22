/*
 * Project:  flower
 * Module:   flower-server
 * File:     UserServiceImpl.java
 * Modifier: nzhou
 * Modified: 2015-07-22 18:08
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package demo.api.user.impl;

import demo.api.user.User;
import demo.api.user.UserRepo;
import demo.api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/22
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }
}
