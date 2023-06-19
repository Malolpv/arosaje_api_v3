const express = require('express');
const chai = require('chai');
const request = require('supertest');

const app = express();

describe('POST login', () => {

    //valid login
    it('should log user', () => {
        request(app)
        .post('/login')
        .send({"email":"malo.lepavec@gmail.com","password":"test"})
        .expect(200)
    })

    //invalid login
    it('should return 401 not found', () => {
        request(app)
        .post('/login')
        .send({"email":"wrongemail@email.com", "password": "wrong password"})
        .expect(401)
        .then((res) => {chai.expect(res.message).to.be.eql('Email ou mot de passe invalide')})
    })

    //invalid payload
    it('should return 500 internal error', () => {
        request(app)
        .post('/login')
        .send({"mail": "somemail@email.com", "word":"password"})
        .expect(500)
        .then((res) => {chai.expect(res.message).to.be.eql('Internal server error')})
    })
})


describe('POST register', () => {

    //valid register
    it('should register user', () => {
        request(app)
        .post('/login')
        .send({"pseudo": "some pseudo", "email":"malo.lepavec@gmail.com","password":"test","is_botaniste": false})
        .expect(200)
    })

    //account already exist
    it('should return 409 email already exist', () => {
        request(app)
        .post('/login')
        .send({"pseudo": "some pseudo", "email":"malo.lepavec@gmail.com","password":"test","is_botaniste": false})
        .expect(409)
        .then((res) => {chai.expect(res.message).to.be.eql('Un compte existe déjà pour cet email')})
    })
    

    //invalid payload
    it('should return 500 internal error', () => {
        request(app)
        .post('/login')
        .send({"pseu": "some pseudo", "mail":"malo.lepavec@gmail.com","pass":"test","botaniste": false})
        .expect(500)
        .then((res) => {chai.expect(res.message).to.be.eql('Internal server error')})
    })
})