<template>
  <div class="login-container">
    <el-header>
      <el-steps :active="active_tab" finish-status="success" simple style="margin-top: 20px">
        <el-step title="选择用户"></el-step>
        <el-step title="注册需知"></el-step>
        <el-step title="填写联系人信息"></el-step>
        <el-step title="填写单位信息"></el-step>
        <el-step title="提交审核"></el-step>
      </el-steps>
    </el-header>
    <el-main>
      <div style="padding: 10%" v-if="visible_tab[0]">
        <el-row :gutter="100">
          <el-col :xs="24" :sm="20" :md="8" :lg="8">
            <el-button @click="nextPart">
              <img src="http://ozp3cmjs3.bkt.clouddn.com/cgs.jpg" class="icon_image">
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="20" :md="8" :lg="8">
            <el-button @click="nextPart">
              <img src="http://owx4mpp0s.bkt.clouddn.com/gys.jpg" class="icon_image">
            </el-button>
          </el-col>
          <el-col :xs="24" :sm="20" :md="8" :lg="8">
            <el-button @click="nextPart(), nextPartMail()">
              <img src="http://ozp3cmjs3.bkt.clouddn.com/dljg.jpg" class="icon_image">
            </el-button>
          </el-col>
        </el-row>
      </div>
      <!--步骤一-->
      <div v-if="visible_tab[1]">
        <el-row style="margin-bottom: 20px">
          <el-col :span="24">
            <textarea id="u6_input" readonly="">&nbsp; 欢迎阅读BidDesk平台注册条款协议(下称“本协议”)。本协议阐述之条款和条件，适用于注册用户使用BidDesk平台（www.biddesk.cn,www.bidesk.cn）所提供的，采供双方进行电子交易和交流的各种工具和服务(下称“服务”)。

根据《中华人民共和国著作权法》、《全国人大常委会关于维护互联网安全的决定》、《互联网信息服务管理工作办法》、《互联网电子公告服务管理规定》等有关法律、法规，制订以下条款 ：

1. 接受条款

欢迎光临BidDesk平台(以下简称“BidDesk”)。用户以任何方式进入BidDesk即表示贵单位同意自己已经与BidDesk订立本协议，且将受本协议的条款和条件(“条款”) 约束。BidDesk可随时自行全权决定更改“条款”。如“条款”有任何变更，BidDesk将在其网站上刊载公告，通知贵单位。如贵单位不同意相关变更，必须停止使用“服务”。经修订的“条款”一经在BidDesk上公布后，立即自动生效。当贵单位与BidDesk发生争议时，应以最新的服务协议为准。除非经BidDesk的授权高层管理人员签订书面协议，本协议不得另行做出修订。

2. 谁可使用BidDesk？

本“服务”供国内注册的招标代理机构和具有独立法人资格的机构及其他组织机构使用。“服务”不会提供给被暂时或永久中止资格的BidDesk用户。

3. BidDesk仅作为开展采购活动的地点

BidDesk仅作为招标代理机构和供应商就货物和服务的采购进行协商，以及获取各类与采购相关信息的地点。但是，BidDesk不能控制采购所涉及物品的质量、安全或合法性，商贸信息的真实性或准确性，以及交易方履行其在贸易协议项下的各项义务的能力。BidDesk不能也不会控制交易各方能否履行协议义务。

4. BidDesk与用户的权利义务

4.1 注册义务

如您在BidDesk注册，须同意：

4.1.1 在申请使用BidDesk提供的服务时，向BidDesk提供真实、准确、完整和反映当前情况的单位和/或个人资料；

4.1.2如用户单位和/或个人资料有任何变更，用户应及时更新注册资料，如果用户提供的资料包含有真实、不准确、不完整或不能反映当前情况的资料，BidDesk有权暂停或终止贵单位的注册身份及资料，并拒绝注册人在目前或将来对“服务”(或其任何部份) 以任何形式使用。

4.2 成为注册用户

4.2.1 关于BidDesk用户：BidDesk提供免费注册，用户须填写注册信息,递交注册资料交与BidDesk审核,审核通过后,即可成为BidDesk注册用户。

4.2.2 审核用户注册：BidDesk对用户在网上注册所提交的资料进行审核。用户要对其在注册中所填写和提交的信息真实性负全责。

4.3 用户注册账号、密码和保密用户注册账号是用户在本网站的身份标志。贵单位须自行负责对其注册名和密码保密，且须对注册人在注册名和密码下发生的所有活动承担责任。贵单位同意：

4.3.1 如发现任何人未经授权使用贵单位的注册名或密码，或发生违反保密规定的任何其他情况，贵单位应立即通知BidDesk；

4.3.2 确保注册人在每个上网时段结束时，以正确步骤离开网站。BidDesk不能也不会对因注册人未能遵守本款规定而发生的任何损失或损毁负责；

4.3.3 注册人登录BidDesk的采购操作行为，将被视为操作者的真实意思表示，具有法律效力。

4.4关于机构注册资料的规则贵单位同意，机构注册的资料和贵单位在BidDesk网站上交易的任何“物品”（泛指一切可供依法交易的、有形的或无形的、以各种形态存在的某种具体的物品，或某种权利或利益，或某种票据或证券，或某种服务或行为。本协议中“物品”一词均含此义）。

4.4.1 不会有欺诈成份，与售卖伪造或盗窃无涉；

4.4.2 不会侵犯任何第三者对该物品享有的物权，或版权、专利、商标、商业秘密或其他知识产权，或隐私权、名誉权；

4.4.3 不会违反任何法律、法规、条例或规章 (包括但不限于关于规范出口管理、贸易配额、保护消费者、不正当竞争或虚假广告的法律、法规、条例或规章)；

4.4.4 不会含有诽谤（包括商业诽谤）、非法恐吓或非法骚扰的内容；

4.4.5 不会含有淫秽、或包含任何儿童色情内容；

4.4.6 不会含有蓄意毁坏、恶意干扰、秘密地截取或侵占任何系统、数据或个人资料的任何病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他电脑程序；

4.4.7 不会直接或间接与下述各项货物或服务连接，或包含对下述各项货物或服务的描述：本协议项下禁止的货物或服务或贵单位无权连接或包含的货物或服务。此外，贵单位同意不会：(1)在与任何连锁信件、大量胡乱邮寄的电子邮件、滥发电子邮件或任何复制或多余的信息有关的方面使用“服务”；(2)未经其他人士同意，利用“服务”收集其他士的电子邮件地址及其他资料； (3) 利用“服务”制作虚假的电子邮件地址，或以其他形式试图在发送人的身份或信息的来源方面误导其他人士。

4.5 被禁止物品贵单位不得在BidDesk网站公布或通过BidDesk网站买卖：

4.5.1 可能使BidDesk违反任何相关法律、法规、条例或规章的任何物品；

4.5.2 BidDesk认为应禁止或不适合通过本网站买卖的任何物品。

5.单位授予BidDesk独家的、全球通用的、永久的、免费的许可使用权利(并有权在多个层面对该权利进行再授权)，使BidDesk有权(全部或部份地) 使用、复制、修订、改写、发布、翻译、分发、执行和展示"用户的资料"，和/或以现在已知或日后开发的任何形式、媒体或技术，将用户的资料”纳入其他作品内。

6.隐私制度
尽管有第六条所规定的许可使用权，BidDesk将仅根据BidDesk的隐私声明贵单位使用的资料。BidDesk隐私声明的全部条款属于本协议的一部份，因此，贵单位必须仔细阅读。请注意，贵单位一旦自愿地在BidDesk招投标平台披露相关资料，该资料等即可能被其他人士获取和使用。

7. 电子采购交易程序
用户应按相关规定，参加电子采购交易。倘若贵单位与一个或一个以上招标代理机构或供应商发生争议，贵单位免除BidDesk(及BidDesk代理人和雇员)在因该等争议而引起的，或在任何方面与该等争议有关的不同种类和性质的任何(实际和后果性的)权利主张、要求和损害赔偿等方面的责任。贵单位同意，注册人不得使用任何装置、软件或例行程序干预或试图干预BidDesk网站的正常运作或正在BidDesk网站上进行的任何交易。贵单位同意，注册人不得对任何资料作商业性利用，包括但不限于在未经BidDesk授权高层管理人员事先书面批准的情况下，复制在BidDesk上展示的任何资料并用于商业用途。

8. 终止或访问限制
贵单位同意，在BidDesk未向贵单位收费的情况下，BidDesk可自行全权决定以任何理由(包括但不限于BidDesk认为贵单位已违反本协议的字面意义和精神，或贵单位以不符合本协的字面意义和精神的方式行事，或贵单位在超过90天的时间内未以注册人的账号及密码登录网站)终止贵单位的“服务”密码、账户(或其任何部份)或注册人对“服务”的使用，并删除和丢弃注册人在使用“服务”中提交的用户的资料。贵单位同意，在BidDesk向贵单位收费的情况下，BidDesk应基于合理的怀疑且经电子邮件通知的情况下实施上述终止服务的行为。BidDesk同时可自行全权决定，在发出通知或不发出通知的情况下，随时停止提供“服务”或其任何部份。贵单位同意，根据本协议的任何规定终止注册人使用服务之措施可在不发出事先通知的情况下实施，并承认和同意，BidDesk可立即使贵单位注册人的账户无效，或撤销贵单位的账户以及在贵单位的账户内的所有相关资料和档案，和/或禁止注册人进一步接入该等资料或服务”。账号终止后，BidDesk没有义务为贵单位保留原账号中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给注册人或第三方。此外，贵单位同意，BidDesk不会就终止注册人接入“服务”而对贵单位或任何第三者承担任何责任。

9.免责声明

9.1 用户使用网络服务所存在的风险及产生的一切后果将完全由用户自己承担，BidDesk不承担任何责任。

9.2 BidDesk不担保有关网络服务一定能满足用户的全部要求，也不担保网络服务不会受中断，对网络服务的及时性、安全性、准确性都不作担保。

10. 不可抗力

对于因BidDesk合理控制范围以外的原因，包括但不限于自然灾害、罢工或骚乱、物质短缺或定量配给、暴动、战争行为、政府行为、通讯或其他设施故障或严重伤亡事故等，致使BidDesk延迟或未能履约的，BidDesk不对贵单位承担任何责任。

11. 仲裁

本协议的解释权归BidDesk所有，用户在使用本网站的服务时，必须遵守国家相关的法律、规定。任何与本协议以及本网站服务有关的纠纷，双方应首先互相协商；如果不能达成一致，可提交北京仲裁委员会仲裁。若以上任何条款与法律相抵触，则以法律条文为主。
</textarea>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="24">
            <el-checkbox v-model="checked" @change="checkedChange">同意注册选项</el-checkbox>
          </el-col>
        </el-row>
        <el-row v-if="!visible_tab[4]" style="padding: 0 30%" :gutter="20">
          <el-col v-show="!visible_tab[0]" style="text-align: right" :span="12">
            <el-button type="primary" @click="onPart"><i
              class="el-icon-arrow-left el-icon--left"></i>上一步
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button v-show="!visible_tab[0]" type="primary" :disabled="content_display"
                       @click="nextPart">下一步<i
              class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-col>
        </el-row>
      </div>

      <!--步骤二-->
      <div style="padding: 0 15%" v-show="visible_tab[2]">
        <el-form :model="first_form" :rules="first_form_rules" ref="first_form" label-width="120px"
                 class="demo-first_form">
          <el-row>
            <el-col :span="24">
              <p>账号信息</p>
            </el-col>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="登陆账号" prop="username">
                <el-input v-model="first_form.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="登陆密码" prop="pass">
                <el-input type="pass" v-model="first_form.pass" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="11" :lg="11">
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="pass" v-model="first_form.checkPass" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24">
              <p>个人信息</p>
            </el-col>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="真实姓名" prop="nickname">
                <el-input v-model="first_form.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="11" :lg="11">
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="first_form.sex" label="1">先生</el-radio>
                <el-radio v-model="first_form.sex" label="2">女士</el-radio>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="first_form.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="11" :lg="11">
              <el-form-item label="">
                <el-button type="primary">点击获取验证码</el-button>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="验证码" prop="code">
                <el-input v-model="first_form.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="办公电话" prop="phone">
                <el-input v-model="first_form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="email_display" :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="邮箱" prop="mail">
                <el-input v-model="first_form.mail" placeholder="请输入邮箱">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="email_checked" :xs="24" :sm="20" :md="13" :lg="13">
              <el-form-item label="邮箱" prop="qq_mail">
                <el-input v-model.number="first_form.qq_mail" placeholder="请输入qq邮箱">
                  <template slot="append">@qq.com</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="btn_style" v-if="!visible_tab[4]" style="padding: 5% 30%" :gutter="20">
            <el-col v-show="!visible_tab[0]" :span="12">
              <el-form-item>
                <el-button type="primary" @click="onPart"><i
                  class="el-icon-arrow-left el-icon--left"></i>
                  上一步
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="submitForm('first_form')">下一步<i
                  class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!--步骤三-->
      <div style="padding: 0 15%" v-show="visible_tab[3]">
        <el-form :model="second_form" :rules="second_form_rules" ref="second_form" label-width="140px"
                 class="demo-first_form">
          <el-row>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <p>单位基本信息</p>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12">
              <el-form-item label="单位名称" prop="company_name">
                <el-input v-model="second_form.company_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12">
              <el-form-item label="法人代表" prop="delegate">
                <el-input placeholder="请输入" v-model="second_form.delegate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12">
              <el-form-item label="主营产品" prop="goods_list">
                <!--&lt;!&ndash;<el-select multiple style="width: 100%" v-model="second_form.goods_list" &ndash;&gt;-->
                <!--&lt;!&ndash;placeholder="请添加主营产品标签">&ndash;&gt;</el-select>-->
                <selectGoods :second_form="second_form"></selectGoods>
              </el-form-item>
            </el-col>
            <el-col class="default" :xs="24" :sm="20" :md="12" :lg="12">
              <el-form-item label="注册资金" prop="payment">
                <el-input placeholder="请输入具体资金(万元)" v-model.number="second_form.payment" class="input-with-select">
                  <el-select v-model="default_value" slot="prepend" placeholder="请选择">
                    <el-option label="人民币" value="1"></el-option>
                    <el-option label="欧元" value="2"></el-option>
                    <el-option label="美元" value="3"></el-option>
                    <el-option label="英镑" value="4"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="12" :lg="12">
              <el-form-item label="注册地址" prop="area_option">
                <el-cascader
                  placeholder="请选择城市"
                  v-model="second_form.area_option"
                  :options="area_options"
                  style="width: 100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col class="distance" :xs="24" :sm="20" :md="12" :lg="12">
              <el-form-item label="详细地址" prop="address">
                <el-input placeholder="请输入详细地址" v-model="second_form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--上传-->
          <el-row>
            <el-col :xs="24" :sm="20" :md="13" :lg="13">
              <p>上传证件</p>
            </el-col>
            <el-col :xs="24" :sm="20" :md="24" :lg="24">
              <el-form-item label="是否三证合一" prop="name">
                <el-checkbox v-model="card_checked" @change="cardCheckedChange" label="是" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item prop="business_no" label="营业执照">
                <el-input v-model.number="second_form.business_no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item label="证件到期时间">
                <el-checkbox v-model="date_checked" @change="dateChange" label="长期" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col class="date_style" :class="date_display ? '':'date_text'" :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item prop="business_date">
                <el-date-picker v-if="date_display" type="date" placeholder="输入到期时间"
                                v-model="second_form.business_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="upload_list" :span="24">
              <el-form-item prop="date1">
                <Upload></Upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="card_display">
            <el-col :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item prop="tax_no" label="税务登记号">
                <el-input v-model.number="second_form.tax_no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item label="证件到期时间">
                <el-checkbox v-model="date_checked" @change="dateChange" label="长期" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col class="date_style" :class="date_display ? '':'date_text'" :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item prop="tax_date">
                <el-date-picker v-if="date_display" type="date" placeholder="输入到期时间"
                                v-model="second_form.tax_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="upload_list" :span="24">
              <el-form-item prop="date1">
                <Upload></Upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="card_display">
            <el-col :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item prop="organization_no" label="组织机构代码证号">
                <el-input v-model.number="second_form.organization_no"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item label="证件到期时间">
                <el-checkbox v-model="date_checked" @change="dateChange" label="长期" border></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col class="date_style" :class="date_display ? '':'date_text'" :xs="24" :sm="20" :md="8" :lg="8">
              <el-form-item prop="organization_date">
                <el-date-picker v-if="date_display" type="date" placeholder="输入到期时间"
                                v-model="second_form.organization_date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="upload_list" :span="24">
              <el-form-item prop="date1">
                <Upload></Upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="btn_style" v-if="!visible_tab[4]" style="padding: 5% 30%" :gutter="20">
            <el-col v-show="!visible_tab[0]" :span="12">
              <el-form-item>
                <el-button type="primary" @click="onPart"><i
                  class="el-icon-arrow-left el-icon--left"></i>
                  上一步
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button type="primary" @click="submitSecondForm('second_form')">下一步<i
                  class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!--步骤四-->
      <div style="text-align: center" v-if="visible_tab[4]">
        <el-row style="">
          <el-col :span="24">
            <p>您已注册成功，请尽快登录平台完善信息并提交，平台管理员将进行审核。
              如有疑问请拨打客服电话：400-052-2008。</p>
            <router-link to="/index">
              <el-button type="primary">完成</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>


      <!--按钮-->

    </el-main>

  </div>
</template>

<script>
  //  import {ROLE_TYPE, GET_METHODS, USER_RULES, DATE_OPTIONS} from '../../store/COMMON_DATA'
  import {areaOptions} from 'store/AREA_DATA'
  import {Area} from '@/utils/getAreaTree';

  const validateMobile = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入手机号'));
    } else {
      const reg = /^1[34578]\d{9}$/;
      if (value.trim().length !== 11) {
        callback(new Error('手机号码长度不为11位'));
      }
      if (!reg.test(value.trim())) {
        callback(new Error('手机号码格式有误'));
      }
      callback();
    }
  };
  const validatePhone = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入固话'));
    } else {
      const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      if (!reg.test(value.trim())) {
        callback(new Error('固话号码格式有误'));
      }
      callback();
    }
  };
  const qqEmail = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请输出qq账号'));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value < 99999) {
          callback(new Error('请输入正确账号'));
        }
        else if (value > 99999999999) {
          callback(new Error('请输入正确账号'));
        }
        else {
          callback();
        }
      }
    }, 1000);
  };

  //  const validateMail = (rule, value, callback) => {
  //    if (value === '') {
  //      callback(new Error('请输入邮箱'));
  //    } else {
  //      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  //      if (!reg.test(value.trim())) {
  //        callback(new Error('邮箱格式有误'));
  //      }
  //      callback();
  //    }
  //  };
  import Upload from '@/custom-components/Upload/singleFile'
  import ElCol from "element-ui/packages/col/src/col";
  import selectGoods from "../components/selectGoods.vue";
  export default {
    mounted(){
//      let area = new Area();
//      area.getOptions('0');
//      // console.log(area.options);
      this.area_options = areaOptions;
    },
    components: {
      ElCol,
      Upload,
      selectGoods
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.first_form.checkPass !== '') {
            this.$refs.first_form.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.first_form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        first_form_rules: {
          username: [
            {required: true, message: '请输入登陆账号', trigger: 'blur'},
            {min: 6, max: 10, message: '长度在 6到 10 个字符', trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'}
          ],
          mobile: [
            {required: true, validator: validateMobile, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码'},
            {type: 'number', message: '只能输入数字'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ],
          mail: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          qq_mail: [
            {validator: qqEmail, trigger: 'blur'}
          ]
        },
        second_form_rules: {
          payment: [
            {required: true, message: '请输入注册资金'},
            {type: 'number', message: '只能输入数字'}
          ],
          company_name: [
            {required: true, message: '请输入单位名称', trigger: 'blur'}
          ],
          area_option: [
            {type: 'array', required: true, message: '请选择注册地址', trigger: 'change'}
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ],
          delegate: [
            {required: true, message: '请输入法人代表', trigger: 'blur'}
          ],
          goods_list: [
            {type: 'array', required: true, message: '请至少选择一个主营产品', trigger: 'change'}
          ],
          business_date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          tax_date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          organization_date: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          business_no: [
            {required: true, message: '请输入证件号'},
            {type: 'number', message: '只能输入数字'}
          ],
          tax_no: [
            {required: true, message: '请输入证件号'},
            {type: 'number', message: '只能输入数字'}
          ],
          organization_no: [
            {required: true, message: '请输入证件号'},
            {type: 'number', message: '只能输入数字'}
          ],
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        content_display: true,
        card_display: true,
        dialogVisible: false,
        dateTxt: false,
        visible_tab: [1, 0, 0, 0],
        current_tab: 0,
        active_tab: 1,
        disabled: true,
        email_checked: false,
        email_display: true,
        date_checked: false,
        date_display: true,
        checked: false,
        card_checked: false,
        default_value: '1',
        null_array: [],
        first_form: {
          username: 'ttjimm',
          pass: 123456,
          checkPass: 123456,
          nickname: 'mmm',
          code: 123,
          mobile: '17625990344',
          phone: '2342343',
          sex: '1',
          mail: 'ttjimsen@qq.com',
          qq_mail: ''
        },
        second_form: {
          company_name: '中华科技',
          business_date: '',
          tax_date: '',
          organization_date: '',
          delegate: '王晓东',
          address: '安德门18号东大街',
          area_option: [],
          goods_list: [],
          up_file_list: [],
          business_no: 123466,
          tax_no: '',
          organization_no: '',
          payment: 10000
        }
      }
    },
    methods: {
      goodList(){
        // console.log(this.options)
        this.dialogFormVisible = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.nextPart()
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      submitSecondForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.nextPart()
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      checkedChange(){
        if (this.checked == true) {
          this.content_display = false
        } else {
          this.content_display = true
        }
      },
      cardCheckedChange(){
        if (this.card_checked == true) {
          this.card_display = false
        } else {
          this.card_display = true
        }
      },
      dateChange(){
        if (this.date_checked == false) {
          this.date_display = true
        } else {
          this.date_display = false
          this.second_form_rules.business_date.splice(0, 1)
        }
      },
      nextPart(){
//        alert(this.current_tab);
        this.visible_tab.splice(this.current_tab, 1, 0);
        this.current_tab++;
        this.active_tab++;
        this.visible_tab.splice(this.current_tab, 1, 1);
        if (this.current_tab !== this.visible_tab[0]) {
          this.followed = false
        }
      },
      nextPartMail(){
        this.email_checked = true
        this.email_display = false
      },
      onPart(){
        if (this.current_tab > 0) {
//          alert(1)
          this.visible_tab.splice(this.current_tab, 1, 0);
          this.current_tab--;
          this.active_tab--;
          this.visible_tab.splice(this.current_tab, 1, 1);
        }
      }
    }
  }

</script>
<style scoped>
  bady {
    background-color: #1f2d3d;
  }

  .btn_style {
    text-align: center;
  }

  /*.btn_style .el-form-item__content {*/
    /*margin-left: 0 !important;*/
  /*}*/

  .default .el-select .el-input {
    width: 120px;
  }

  .date_text {
    display: none !important;
  }

  .icon_image {
    width: 100%;
  }

  .icon_text {
    font-size: 1.5em;
  }

  .upload_list ul {
    padding-left: 10%;
    display: inline-flex;
  }

  /*.distance .el-form-item__content {*/
  /*margin-left: 40px !important;*/
  /*}*/

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .btn-success {
    text-align: right;
  }

  .btn-secondary {
    text-align: left;
  }

  #u6_input {
    width: 100%;
    min-height: 550px;
    padding: 1%;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-indent: 2em;
    text-decoration: none;
    color: #000000;
    text-align: left;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  textarea {
    margin: 0px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
</style>

