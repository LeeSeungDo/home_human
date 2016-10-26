package objackie.vo;

import java.io.Serializable;
import java.sql.Date;

public class RealEstate implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int buildNo;
  protected String landlordEmail;
  protected String realEstateId;
  protected int postNo;
  protected String basicAddr;
  protected String detailAddr;
  protected int realEstateType;
  protected int parking;
  public int getBuildNo() {
    return buildNo;
  }
  public void setBuildNo(int buildNo) {
    this.buildNo = buildNo;
  }
  public String getLandlordEmail() {
    return landlordEmail;
  }
  public void setLandlordEmail(String landlordEmail) {
    this.landlordEmail = landlordEmail;
  }
  public String getRealEstateId() {
    return realEstateId;
  }
  public void setRealEstateId(String realEstateId) {
    this.realEstateId = realEstateId;
  }
  public int getPostNo() {
    return postNo;
  }
  public void setPostNo(int postNo) {
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
  public int getRealEstateType() {
    return realEstateType;
  }
  public void setRealEstateType(int realEstateType) {
    this.realEstateType = realEstateType;
  }
  public int getParking() {
    return parking;
  }
  public void setParking(int parking) {
    this.parking = parking;
  }
  
}







