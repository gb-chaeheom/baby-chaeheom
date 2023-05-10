package com.app.babybaby.repository.member.kid;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Slf4j
@Transactional
@Rollback(false)
public class KidRepositoryTests {
    @Autowired
    KidRepository kidRepository;

    public void findAllKidsByEventId_QueryDslTest(){
    }
}