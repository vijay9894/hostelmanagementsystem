package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.NoticeEntity;
import com.example.hostel.repository.NoticeRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	private NoticeRepository noticeRepository;
	
	@Override
	public List<NoticeEntity> getAllNotices() {
		return noticeRepository.findAll();
	}

	@Override
	public Optional<NoticeEntity> getByNoticeId(int id) {
		return noticeRepository.findById(id);
	}

	@Override
	public NoticeEntity save(NoticeEntity notice) {
		return noticeRepository.save(notice);
	}

	@Override
	public void deleteByNoticeId(int id) {
		noticeRepository.deleteById(id);
	}

}
