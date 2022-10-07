package com.project.samals.exception;

public class UserDuplicateException extends RuntimeException {
    public UserDuplicateException(String msg){
        super(msg);
    }
}
