/*
 * Project:  msc-service
 * Module:   msc-server
 * File:     Codecs.java
 * Modifier: xyang
 * Modified: 2015-01-09 19:00
 *
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 *
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */

package com.orange.flower.core.util;

import com.google.common.base.Charsets;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;
import com.google.common.io.BaseEncoding;
import com.google.common.primitives.Longs;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import java.nio.ByteBuffer;

public final class Codecs {

    private static HashFunction HF = Hashing.murmur3_128("orange".hashCode());
    private static BaseEncoding BE = BaseEncoding.base64Url().omitPadding();

    public static byte[] hash(byte[] bytes) {
        return HF.hashBytes(bytes).asBytes();
    }

    public static String hash(String str) {
        return encode(hash(toBytes(str)));
    }

    public static String hash(String str, int len) {
        return StringUtils.left(hash(str), len);
    }

    public static String hash(long l) {
        return encode(HF.hashLong(l).asBytes());
    }

    public static String md5Hex(byte[] bytes) {
        return Hashing.md5().hashBytes(bytes).toString();
    }

    public static String md5Hex(String str) {
        return md5Hex(toBytes(str));
    }

    public static String sha1Hex(byte[] bytes) {
        return Hashing.sha1().hashBytes(bytes).toString();
    }

    public static String sha1Hex(String str) {
        return sha1Hex(toBytes(str));
    }

    public static String encode(byte[] bytes) {
        return BE.encode(bytes);
    }

    public static String encode(long l) {
        return encode(Longs.toByteArray(l));
    }

    public static String encode(int i) {
        ByteBuffer buf = ByteBuffer.allocate(4);
        buf.putInt(i);
        return encode(buf.array());
    }

    public static byte[] decode(String str) {
        return BE.decode(str);
    }

    public static byte[] toBytes(String s) {
        if (s == null) {
            return ArrayUtils.EMPTY_BYTE_ARRAY;
        }
        return s.getBytes(Charsets.UTF_8);
    }

    public static String toString(byte[] bytes) {
        return new String(bytes, Charsets.UTF_8);
    }
}
