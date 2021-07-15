import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import bear from "../../public/ice-bear.png";
import badge2021 from "../../public/badge-2021.png";
import logo from "../../public/logo-horizontal.svg";

import classes from "./ResultPanel.module.scss";

const SORRY = {
  expired: "很遗憾该用户的证书已过期。",
  notPassed: "很遗憾该用户未通过我们的爱他美代购培训，因而没有获得培训证书。",
};

const ResultPanel = ({ player }) => {
  const router = useRouter();

  if (!player) {
    return <p>not allowed</p>;
  }

  if (!player.isCertified) {
    return (
      <>
        <div className={classes["title-neg"]}>抱歉！</div>
        <div className={classes.neg}>
          <p>{SORRY.notPassed}</p>
        </div>
      </>
    );
  }

  const certificateNum =
    "0".repeat(8 - player.id.toString().length) + player.id;
  const issue_at = player.created_at.substr(0, 10);
  const expired_at = Date.parse(player.created_at) + 31536000;
  const score = player.score;

  return (
    <>
      <div className={classes["title-pos"]}>恭喜！</div>
      <div className={classes.congrats}>
        该用户成功通过了我们德国爱他美关于婴幼儿奶粉的代购培训，并且获得了证书。
      </div>

      <div className={classes.pos}>
        <div className={classes.bear}>
          <Image src={bear} layout="fill" objectFit="contain" />
        </div>

        <div className={classes.logo}>
          <Image src={logo} width={422} height={72} objectFit="contain" />
        </div>

        <h2>成就证书</h2>
        <h3>证书授予：</h3>

        <div className={classes.details}>
          <div className={classes.detail}>
            <div className={classes.field}>用户名</div>
            <span>{player.nickname}</span>
          </div>
          <div className={classes.detail}>
            <div className={classes.field}>证书号</div>
            <span>{certificateNum}</span>
          </div>
          <div className={classes.detail}>
            <div className={classes.field}>颁发日期</div>
            <span>{issue_at}</span>
          </div>
          <div className={classes.detail}>
            <div className={classes.field}>有效期至</div>
            <span>{expired_at}</span>
          </div>
          <div className={classes.detail}>
            <div className={classes.field}>成绩</div>
            <span>
              {score} <span className={classes.fullScore}>/ 500</span>
            </span>
          </div>

          <div className={classes.badges}>
            <div className={classes.badge}>
              <Image src={badge2021} layout="fill" objectFit="contain" />
            </div>
            <div className={classes.exp}>
              <h5>
                第一期培训
                <br />
                2021年夏季
              </h5>
              <p>
                5门课程
                <br />
                1次在线培训
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPanel;