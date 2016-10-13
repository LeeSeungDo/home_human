/* <부동산계약>
 * 작성자 : 이승도
 * 작성일 : 2016-10-13
 */

package objackie.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class RealEstateContract implements Serializable {
  private static final long serialVersionUID = 1L;
  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

  protected int contractNo; // 게시판 글번호 [Primary-key / Auto-increment]
  protected int buindingNo; // 임대건물번호 [Foreign-key]
  protected String tenantEmail; // 임차인 이메일 [Foreign-key]
  protected 
  protected 
  protected 
  protected 
  protected 
  protected 

}
