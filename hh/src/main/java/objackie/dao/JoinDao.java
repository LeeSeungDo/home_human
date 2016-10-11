package objackie.dao;

import objackie.vo.Member;

public interface JoinDao {
  String insert(Member member)throws Exception;
}
