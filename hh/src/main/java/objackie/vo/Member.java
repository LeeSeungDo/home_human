package objackie.vo;

import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;
  static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

  protected String email;
  protected String name;
  protected String tel;
  protected int gender;
  protected Date birth;
  protected char postNo;
  protected String basicAddr;
  protected String detailAddr;
  protected String phoPath;
  protected int auth;
  protected transient String password;

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getTel() {
    return tel;
  }

  public void setTel(String tel) {
    this.tel = tel;
  }

  public int getGender() {
    return gender;
  }

  public void setGender(int gender) {
    this.gender = gender;
  }

  public Date getBirth() {
    return birth;
  }

  public void setBirth(Date birth) {
    this.birth = birth;
  }

  public char getPostNo() {
    return postNo;
  }

  public void setPostNo(char postNo) {
    this.postNo = postNo;
  }

  public String getBasicAddr() {
    return basicAddr;
  }

  public void setBasicAddr(String basicAddr) {
    this.basicAddr = basicAddr;
  }

  public String getDetailAddr() {
    return detailAddr;
  }

  public void setDetailAddr(String detailAddr) {
    this.detailAddr = detailAddr;
  }

  public String getPhoPath() {
    return phoPath;
  }

  public void setPhoPath(String phoPath) {
    this.phoPath = phoPath;
  }

  public int getAuth() {
    return auth;
  }

  public void setAuth(int auth) {
    this.auth = auth;
  }

  @Override
  public String toString() {
    return "Member [email=" + email + ", name=" + name + ", tel=" + tel + ", gender=" + gender + ", birth=" + birth
        + ", postNo=" + postNo + ", basicAddr=" + basicAddr + ", detailAddr=" + detailAddr + ", phoPath=" + phoPath
        + ", auth=" + auth + "]";
  }

}
