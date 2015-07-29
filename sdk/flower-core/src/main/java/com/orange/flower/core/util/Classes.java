/*
 * Project:  flower
 * Module:   flower-core
 * File:     Classes.java
 * Modifier: nzhou
 * Modified: 2015-07-29 15:09
 * Copyright (c) 2014 Wisorg All Rights Reserved.
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent
 * or the registration of a utility model, design or code.
 */
package com.orange.flower.core.util;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.Set;

/**
 * .
 * <p/>
 * 
 * @author <a href="mailto:oxsean@gmail.com">sean yang</a>
 * @version V1.0, 11-12-26
 */
@SuppressWarnings({ "unchecked", "rawtypes" })
public final class Classes {

    public static <T> Class<T> getGenericParameter(Class clazz, int index) {
        Type genType = clazz.getGenericSuperclass();
        if (genType instanceof ParameterizedType) {
            return getGenericParameter((ParameterizedType)genType, index);
        }
        return null;
    }

    public static <T> Class<T> getGenericParameter0(Class clazz) {
        return getGenericParameter(clazz, 0);
    }
    
    public static <T> Class<T> getGenericParameter(Field field, int index) {
    	Type genType = field.getGenericType();
    	if (genType instanceof ParameterizedType) {
            return getGenericParameter((ParameterizedType)genType, index);
        }
        return null;
    }
    
    public static <T> Class<T> getGenericParameter0(Field field) {
    	return getGenericParameter(field, 0);
    }
    
    private static <T> Class<T> getGenericParameter(ParameterizedType type, int index) {
    	 Type param = type.getActualTypeArguments()[index];
         if (param instanceof Class) {
             return (Class) param;
         }
         return null;
    }
    
	public static Set<Field> getAnnotatedFields(Class clazz,Class<? extends Annotation>... annotations) {
		return doInAnnotatedFields(clazz,new SetFieldExtractor() ,annotations);
	}
	
	public static Field getAnnotatedField(Class clazz,Class<? extends Annotation>... annotations) {
		return doInAnnotatedFields(clazz,new SingleFieldExtractor() ,annotations);
	}
	
	public static <T> T doInAnnotatedFields(Class clazz,FieldExtractor<T> extractor, Class<? extends Annotation>... annotations) {
		for (Field field : clazz.getDeclaredFields()) {
			int hit = 0;
			for (Class<? extends Annotation> annotation : annotations) {
				if (field.isAnnotationPresent(annotation)){
					hit++;
				} else {
					break;
				}
			}
			if (hit == annotations.length) {
				if (!extractor.extractNext(field)){
					return extractor.getReturn();
				}
			}
		}
		Class parent = clazz.getSuperclass();
		if (parent != null) {
			return doInAnnotatedFields(parent,extractor,annotations);
		}
		return extractor.getReturn();
	}
	
	private static class SetFieldExtractor implements FieldExtractor<Set<Field>> {
		Set<Field> result = new HashSet<Field>();

		@Override
		public boolean extractNext(Field field) {
			result.add(field);
			return true;
		}

		@Override
		public Set<Field> getReturn() {
			return result;
		}
	}
	
	private static class SingleFieldExtractor implements FieldExtractor<Field> {
		Field field = null;
		@Override
		public boolean extractNext(Field field) {
			this.field = field;
			return false;
		}

		@Override
		public Field getReturn() {
			return field;
		}
	}

    private Classes() {
    }
    
    public interface FieldExtractor<T> {
    	boolean extractNext(Field field);
    	T getReturn();
    }

}
