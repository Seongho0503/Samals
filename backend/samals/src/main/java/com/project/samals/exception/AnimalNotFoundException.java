package com.project.samals.exception;

public class AnimalNotFoundException extends RuntimeException {
    public AnimalNotFoundException(String msg){
        super(msg);
    }
}
