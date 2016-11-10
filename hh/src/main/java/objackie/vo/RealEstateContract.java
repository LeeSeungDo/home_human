/* 부동산계약(RE_CRCT) 테이블
작성자 : 이승도
최종수정일 : 2016-11-10
*/

package objackie.vo;

import java.io.Serializable;
import java.sql.Date;

public class RealEstateContract implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int contractNo;         // 계약번호 (CRCT_NO) [PK]
  protected int buildNo;            // 임대건물번호 (BUILD_NO) [FK]
  protected String tenantEmail;     // 임차인이메일 (T_EMAIL) [FK]
  protected int contractType;       // 임대유형 (CRCT_TYPE)
  protected int deposit;            // 보증금 (DPST)
  protected int rentAmount;         // 월세금액 (R_AMNT)
  protected Date contractDate;      // 계약일 (CRCT_DT)
  protected Date endDate;           // 만료일 (END_DT)
  protected Date rentPayDate;       // 월세납입일 (RTPAY_DT)
  protected Date utilityPayDate;    // 관리비납입일 (UTPAY_DT)
  protected int contractStatus;     // 계약상태 (CRCT_STAT)
  /*------------------------------------------------------------*/
  protected String contractPhoto;   // 보류

  /*----------------------부동산 (RE) 테이블--------------------*/
  protected String detailAddress;   // 상세주소 (DIT_ADDR)
  
  /*----------------------회원 (MEMBS) 테이블-------------------*/
  protected String email;           // 이메일 (EMAIL)
  protected String name;            // 이름 (NAME)
  protected String tel;             // 전화번호 (TEL)

  public int getContractNo() {
    return contractNo;
  }

  public void setContractNo(int contractNo) {
    this.contractNo = contractNo;
  }

  public int getBuildNo() {
    return buildNo;
  }

  public void setBuildNo(int buildNo) {
    this.buildNo = buildNo;
  }

  public String getTenantEmail() {
    return tenantEmail;
  }

  public void setTenantEmail(String tenantEmail) {
    this.tenantEmail = tenantEmail;
  }

  public int getContractType() {
    return contractType;
  }

  public void setContractType(int contractType) {
    this.contractType = contractType;
  }

  public int getDeposit() {
    return deposit;
  }

  public void setDeposit(int deposit) {
    this.deposit = deposit;
  }

  public int getRentAmount() {
    return rentAmount;
  }

  public void setRentAmount(int rentAmount) {
    this.rentAmount = rentAmount;
  }

  public Date getContractDate() {
    return contractDate;
  }

  public void setContractDate(Date contractDate) {
    this.contractDate = contractDate;
  }

  public Date getEndDate() {
    return endDate;
  }

  public void setEndDate(Date endDate) {
    this.endDate = endDate;
  }

  public Date getRentPayDate() {
    return rentPayDate;
  }

  public void setRentPayDate(Date rentPayDate) {
    this.rentPayDate = rentPayDate;
  }

  public Date getUtilityPayDate() {
    return utilityPayDate;
  }

  public void setUtilityPayDate(Date utilityPayDate) {
    this.utilityPayDate = utilityPayDate;
  }

  public int getContractStatus() {
    return contractStatus;
  }

  public void setContractStatus(int contractStatus) {
    this.contractStatus = contractStatus;
  }

  public String getContractPhoto() {
    return contractPhoto;
  }

  public void setContractPhoto(String contractPhoto) {
    this.contractPhoto = contractPhoto;
  }

  public String getDetailAddress() {
    return detailAddress;
  }

  public void setDetailAddress(String detailAddress) {
    this.detailAddress = detailAddress;
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

  @Override
  public String toString() {
    return "RealEstateContract [contractNo=" + contractNo + ", buildNo=" + buildNo + ", tenantEmail=" + tenantEmail
        + ", contractType=" + contractType + ", deposit=" + deposit + ", rentAmount=" + rentAmount + ", contractDate="
        + contractDate + ", endDate=" + endDate + ", rentPayDate=" + rentPayDate + ", utilityPayDate=" + utilityPayDate
        + ", contractStatus=" + contractStatus + ", contractPhoto=" + contractPhoto + ", detailAddress=" + detailAddress
        + ", email=" + email + ", name=" + name + ", tel=" + tel + "]";
  }

}