package objackie.vo;

import java.io.Serializable;

public class GongziFile implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int no;
  protected int gongziNo;
  protected String filename;

  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public int getGongziNo() {
    return gongziNo;
  }

  public void setGongziNo(int gongziNo) {
    this.gongziNo = gongziNo;
  }

  public String getFilename() {
    return filename;
  }

  public void setFilename(String filename) {
    this.filename = filename;
  }

  @Override
  public String toString() {
    return "GongziFile [no=" + no + ", gongziNo=" + gongziNo + ", filename=" + filename + "]";
  }

}