package objackie.dao;

import objackie.vo.Member;

public interface JoinDao {
  String insertMember(Member member)throws Exception;
}
