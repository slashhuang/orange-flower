/*
 * Project:  flower
 * Module:   flower-server
 * File:     UserService.java
 * Modifier: nzhou
 * Modified: 2015-07-22 18:06
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package demo.api.user;

import java.util.List;

/**
 * .
 * <p/>
 *
 * @author <a href="mailto:stormning@163.com">stormning</a>
 * @version V1.0, 2015/7/22
 */
public interface UserService {

    List<User> findAll();

    User save(User user);
}
