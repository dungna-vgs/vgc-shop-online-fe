'use client'
import React from 'react'
import { Tabs, Space } from 'antd'
import Link from 'next/link'
import useWindowDimensions from '@/hocs'
import './style.scss'


export default function PolicyPgae() {
  const { width } = useWindowDimensions()

  return (
    <div className='max-w-[1200px] min-h-full mx-auto md:p-6 p-4'>
      <div>
        <Space size={30}>
          <Tabs
            defaultActiveKey='tab1'
            tabPosition={width > 800 ? 'left' : 'top'}
          >
            <Tabs.TabPane tab='Giới thiệu' key='tab1'>
              <div>
                <ul className='text-justify list-disc'>
                  Được thành lập từ năm 2016,{' '}
                  <strong>Công ty cổ phần Việt Nam Golf (VG Corp)</strong> với
                  tiền thân là VGS Group, trải qua nhiều năm hình thành và phát
                  triển, VG Corp trở thành một trong những tập đoàn hàng đầu
                  chuyên cung cấp các sản phẩm, dịch vụ và giải pháp chuyên biệt
                  về golf đến gần 100.000 golfer trên khắp cả nước. VG Corp đã
                  ký kết hợp tác toàn diện với Hiệp Hội Golf Việt Nam (VGA) để
                  cung cấp giải pháp tính điểm chấp Handicap thông qua siêu ứng
                  dụng vHandicap. Đây là ứng dụng tính điểm chấp Quốc gia duy
                  nhất tại Việt Nam được công nhận bởi USGA và R&A. Hiện tại,
                  ứng dụng đã có dữ liệu của hơn 100.000 golfer tại Việt Nam và
                  số lượng này dự kiến sẽ tiếp tục tăng trong tương lai. Với
                  vHandicap, người chơi golf sẽ luôn tìm thấy sự hài lòng khi sử
                  dụng vHandicap với các tính năng ưu việt sau:
                  <li>
                    Áp dụng luật tính handicap theo tiêu chuẩn mới nhất trên thế
                    giới;
                  </li>
                  <li>
                    Xác thực golfer chính xác đến người chơi tránh làm giả và
                    gian lận handicap;
                  </li>
                  <li>
                    Tổng đài hỗ trợ sẽ cập nhật thẻ điểm 24/24 cho tất cả các
                    hội viên vHandicap để tính điểm chấp;
                  </li>
                  <li>
                    Tùy theo thói quen, độ tuổi, golfer sẽ tìm thấy sự tiện lợi
                    trong cách nhập thẻ điểm: Chụp score card gửi về, nhập nhanh
                    theo hố hoặc nhập chi tiết từng hố và từng cú đánh;
                  </li>
                  <li>
                    Cho phép kết bạn và xác nhận cho bạn chơi để đảm bảo tính
                    minh bạch của Thẻ điểm;
                  </li>
                  <li>
                    Thống kê lịch sử thi đấu và biểu đồ phong độ hoặc so sánh
                    phong độ với bạn chơi khác;
                  </li>
                  <li>
                    Cấp chứng chỉ handicap và thẻ thi đấu online để xác thực với
                    các đơn vị tổ chức giải đấu cho người chơi nghiệp dư;
                  </li>
                  <li>
                    Luôn cập nhật thay đổi thông số các sân golf thường xuyên;
                  </li>
                  <li>
                    Ngoài ra người chơi có thể kết nối với nhau thông qua Bảng
                    xếp hạng Nghiệp dư, trò chuyện, đăng ảnh, chia sẻ cảm nghĩ,
                    đăng ký tham gia các giải đấu Nghiệp dư, tạo sự kiện, tham
                    gia hoặc quản lý các Câu lạc bộ.
                  </li>
                  Bên cạnh việc đăng ký/gia hạn sử dụng dịch vụ Phí hội viên để
                  được hưởng trọn vẹn những tiện ích mà vHandicap mang lại, việc
                  sở hữu những mã vHandicap đặc biệt, mang nhiều ý nghĩa may mắn
                  đã trở thành nhu cầu của nhiều người chơi golf tại Việt Nam.
                  Bởi, ngoài là con số định danh trên hệ thống Handicap quốc
                  gia, mã số này còn gắn liền với tên tuổi của mỗi golfer.
                </ul>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Chính sách sử dụng' key='tab2'>
              <div className='text-justify'>
                <ul>
                  <strong>ĐIỀU KHOẢN SỬ DỤNG:</strong>
                  <li>a. Phạm vi áp dụng:</li>
                  <li>
                    - Những điều khoản trong chính sách sử dụng này áp dụng cho
                    các Khách Hàng khi sử dụng website{' '}
                    <Link
                      className='text-green-700'
                      href='https://store.vgcorp.vn/ '
                    >
                      https://store.vgcorp.vn/{' '}
                    </Link>
                  </li>
                  <li>
                    - Khi sử dụng website{' '}
                    <Link
                      className='text-green-700'
                      href='https://store.vgcorp.vn/ '
                    >
                      https://store.vgcorp.vn/{' '}
                    </Link>{' '}
                    và bất kỳ dịch vụ nào tại đây có nghĩa là Khách Hàng đã chấp
                    nhận và đồng ý tuân theo những quy định này. Ngoài ra khi sử
                    dụng các dịch vụ cụ thể, Khách Hàng phải tuân theo các điều
                    khoản riêng và chung áp dụng cho dịch vụ đó theo từng thời
                    điểm (nếu có). Khách Hàng thừa nhận rằng đã đọc, hiểu rõ và
                    đồng ý đối với các nội dung Điều khoản.
                  </li>
                  <li>
                    - VG Corp có thể sửa đổi nội dung các Điều khoản bất cứ lúc
                    nào bằng cách đăng các Điều khoản đã sửa đổi trên trang web
                    này. Việc Khách Hàng tiếp tục sử dụng các Dịch vụ sau thời
                    điểm này đồng nghĩa với việc Khách Hàng chấp nhận và đồng ý
                    với các Điều khoản sửa đổi.
                  </li>
                  <li>b. Sử dụng hợp pháp:</li>
                  <li>
                    - Khách hàng khi đồng ý sử dụng Dịch vụ phải tuân theo các
                    quy định của pháp luật hiện hành.
                  </li>
                  <li>
                    - Nghiêm cấm Khách Hàng sử dụng Dịch Vụ nhằm thực hiện các
                    hành vi vi phạm pháp luật.
                  </li>
                </ul>
                <ul className='list-disc'>
                  <strong>HOÀN TRẢ</strong>
                  <li>
                    Phí Dịch vụ Hội viên và Mã đẹp VGA đã thanh toán sẽ không
                    được hoàn lại, trừ trường hợp pháp luật yêu cầu.
                  </li>
                </ul>
                <ul className='list-disc'>
                  <strong>TẠM NGỪNG/CHẤM DỨT SỬ DỤNG DỊCH VỤ</strong>
                  <li>
                    VG Corp có quyền tạm ngừng hoặc chấm dứt hoàn toàn việc cung
                    cấp dịch vụ mà không cần báo trước và không hoàn lại bất kỳ
                    một chi phí nào cho Khách Hàng trong các trường hợp Khách
                    Hàng vi phạm bao gồm nhưng không giới hạn ở việc vi phạm các
                    Điều khoản này.
                  </li>
                </ul>
                <ul className='list-disc'>
                  {' '}
                  <strong>XỬ LÝ KHIẾU NẠI</strong>
                  <li>
                    Điều khoản sử dụng này được giải thích và điều chỉnh theo
                    quy định của pháp luật Nước Cộng hòa Xã hội Chủ nghĩa Việt
                    Nam.
                  </li>
                  <li>
                    Trường hợp có các tranh chấp phát sinh và/hoặc liên quan đến
                    Điều khoản sử dụng này thì các tranh chấp đó sẽ được giải
                    quyết tại Tòa án nhân dân có thẩm quyền.
                  </li>
                  <li>
                    Nếu có bất kỳ thắc mắc hoặc vấn đề phát sinh cần được hỗ
                    trợ, giải đáp, Khách Hàng vui lòng thông tin tới Chúng tôi
                    tại địa chỉ: BT4.7, Khu Đoàn Ngoại Giao, Đường Bùi Thị Xuân,
                    Phường Xuân Tảo, Quận Bắc Từ Liêm, Thành phố Hà Nội, Việt
                    Nam. <strong>Hotline:</strong>{' '}
                    <Link
                      className='text-green-700'
                      href='tel:+0899855599'
                      target='_blank'
                    >
                      1900 2126
                    </Link>{' '}
                    hoặc <strong>Email:</strong>{' '}
                    <Link
                      href='mailto:feedback@vgcorp.vn?'
                      target='_blank'
                      className='text-green-700'
                    >
                      feedback@vgcorp.vn
                    </Link>
                  </li>
                </ul>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Bảo mật thông tin' key='tab3'>
              <div className='text-justify'>
                <ul>
                  <strong>
                    Chính sách bảo mật thông tin Khách Hàng của VG Corp
                  </strong>
                  <li>
                    VG Corp cam kết bảo vệ quyền riêng tư và bảo mật thông tin,
                    dữ liệu cá nhân của Khách Hàng khi sử dụng các sản phẩm và
                    dịch vụ của Chúng tôi. Chính sách bảo mật này cũng cung cấp
                    những thông tin cần thiết và giải thích cho Khách Hàng cách
                    VG Corp thu thập, sử dụng, lưu trữ và bảo vệ thông tin, dữ
                    liệu mà Khách Hàng cung cấp. Bằng cách sử dụng các sản phẩm,
                    dịch vụ mà Chúng tôi cung cấp, Khách Hàng đã đồng ý với việc
                    thu thập và sử dụng thông tin theo chính sách này.
                  </li>
                </ul>
                <ul>
                  <strong> 1. Thu thập thông tin</strong>
                  <li>
                    VG Corp thu thập các thông tin cá nhân của Khách Hàng như
                    tên, số điện thoại, địa chỉ, email,... khi Khách Hàng truy
                    cập website thực hiện mua hàng và tự nguyện gửi. Những thông
                    tin này chỉ được sử dụng để đáp ứng yêu cầu của Khách Hàng
                    và được VG Corp xử lý theo những cam kết trong chính sách
                    này.
                  </li>
                </ul>
                <ul>
                  <strong> 2. Mục đích thu thập</strong>
                  <li>
                    Toàn bộ thông tin cá nhân thu thập được từ Khách Hàng chỉ
                    được VG Corp sử dụng cho một hoặc tất cả những mục đích sau
                    đây:
                  </li>
                  <li>
                    - Hỗ trợ, tư vấn và giải đáp các thắc mắc của Khách Hàng;
                  </li>
                  <li>
                    - Xử lý các đơn đặt hàng, cung cấp dịch vụ và thông tin qua
                    website của Công ty theo yêu cầu của Khách Hàng;
                  </li>
                  <li>
                    - Gửi thông tin quảng bá về sản phẩm, dịch vụ mới của Công
                    ty, thông tin về các sự kiện nếu Khách Hàng đăng ký nhận
                    email thông báo;
                  </li>
                  <li>
                    - Thực hiện các nghĩa vụ theo hợp đồng, thỏa thuận giữa VG
                    Corp và Khách Hàng và chăm sóc Khách Hàng, giải quyết khiếu
                    nại, khởi kiện của Khách Hàng;
                  </li>
                  <li>
                    - Hiểu về nhu cầu sử dụng sản phẩm, dịch vụ của Khách Hàng
                    và cải thiện chất lượng cung ứng sản phẩm, dịch vụ của VG
                    Corp;
                  </li>
                  <li>
                    - Sử dụng các thông tin mà Khách Hàng cung cấp để hỗ trợ
                    quản lý tài khoản của Khách Hàng, xác nhận và thực hiện các
                    giao dịch tài chính liên quan đến các khoản thanh toán trực
                    tuyến của Khách Hàng.
                  </li>
                  Trường hợp VG Corp xử lý thông tin cá nhân của Khách Hàng với
                  mục đích khác ngoài các mục đích nêu trên, Vg Corp sẽ chỉ thực
                  hiện theo thỏa thuận với Khách Hàng hoặc khi đạt được sự chấp
                  thuận của Khách Hàng.
                </ul>
                <ul>
                  <strong>3. Lưu trữ thông tin</strong>
                  <li>
                    Thông tin cá nhân của Khách Hàng sẽ được VG Corp lưu trữ và
                    áp dụng các biện pháp thích hợp để bảo mật. Trong phạm vi
                    pháp luật cho phép,VG Corp có thể lưu trữ thông tin cá nhân
                    của Khách Hàng tại Việt Nam hoặc tại nước ngoài, kể cả giải
                    pháp lưu trữ trên điện toán đám mây. Việc lưu trữ thông tin
                    được thực hiện trong khoảng thời gian cần thiết để hoàn
                    thành các mục đích như thỏa thuận với Khách Hàng theo chính
                    sách này, các hợp đồng, thỏa thuận, văn kiện khác được xác
                    lập với Khách Hàng, trừ trường hợp được hoặc phải lưu trữ
                    lâu hơn theo yêu cầu của quy định pháp luật từng thời kỳ
                  </li>
                </ul>
                <ul>
                  <strong> 4. Phạm vi sử dụng thông tin</strong>
                  <li>
                    Nhằm thực hiện các mục đích và hoạt động xử lý thông tin cá
                    nhân của Khách Hàng theo chính sách này, sẽ chỉ có những
                    người hoặc tổ chức sau có thể tiếp cận được với thông tin
                    Khách Hàng:
                  </li>
                  <li>- Các đơn vị thành viên của VG Corp;</li>
                  <li>
                    - Bên thứ ba hỗ trợ xác minh thông tin cá nhân của Khách
                    Hàng;
                  </li>
                  <li>- Cơ quan Nhà nước có thẩm quyền;</li>
                  <li>
                    - Nhà cung cấp dịch vụ cho VG Corp và bên hợp tác cung cấp
                    dịch vụ với VG Corp;
                  </li>
                  <li>- Bên thứ ba được Khách Hàng ủy quyền;</li>
                  <li>
                    - Bên thứ ba khác mà VG Corp thấy là cần thiết để đáp ứng,
                    bảo vệ quyền và lợi ích hợp pháp của Khách Hàng.
                  </li>
                </ul>
                <ul>
                  <strong>5. Cam kết bảo mật thông tin</strong>
                  <li>
                    VG Corp cam kết tuân thủ các nguyên tắc sau khi xử lý thông
                    tin cá nhân của Khách Hàng:
                  </li>
                  <li>
                    a. VG Corp xử lý và bảo vệ thông tin cá nhân của Khách Hàng
                    phù hợp với quy định của pháp luật Việt Nam; tuân thủ đầy đủ
                    theo chính sách này và các hợp đồng, thỏa thuận, văn kiện
                    khác xác lập với Khách Hàng (nếu có);
                  </li>
                  <li>
                    b. VG Corp thu thập thông tin cá nhân với mục đích cụ thể,
                    rõ ràng, hợp pháp, trong phạm vi các mục đích đã nêu tại đây
                    và phù hợp với quy định của pháp luật Việt Nam;
                  </li>
                  <li>
                    c. VG Corp luôn áp dụng và cập nhật các biện pháp kỹ thuật
                    phù hợp với quy định của pháp luật Việt Nam nhằm đảm bảo
                    tính an toàn dữ liệu của thông tin Khách Hàng, bao gồm cả
                    việc các biện pháp bảo vệ khỏi sự truy cập trái phép hoặc
                    trái pháp luật và/hoặc sự phá hủy, mất, thiệt hại cho dữ
                    liệu cá nhân;
                  </li>
                  <li>
                    d. VG Corp lưu trữ thông tin cá nhân của Khách Hàng một cách
                    thích hợp và trong phạm vi cần thiết nhằm mục đích xử lý phù
                    hợp với quy định của pháp luật Việt Nam;
                  </li>
                  <li>
                    e. Ngoài các nguyên tắc nêu trên, VG Corp cam kết tuân thủ
                    các quy định liên quan đến bảo vệ dữ liệu của trẻ em và đảm
                    bảo tuân thủ các quy định pháp luật về bảo vệ dữ liệu từng
                    thời kỳ.
                  </li>
                </ul>
                <ul>
                  <strong> 6. Thông tin liên hệ</strong>
                  <li>
                    Trường hợp Khách Hàng có bất kỳ câu hỏi nào liên quan đến
                    chính sách bảo mật thông tin của VG Corp, vui lòng liên hệ
                    với Chúng tôi tại địa chỉ: BT4.7, Khu Đoàn Ngoại Giao, Đường
                    Bùi Thị Xuân, Phường Xuân Tảo, Quận Bắc Từ Liêm, Thành phố
                    Hà Nội, Việt Nam. <strong>Hotline:</strong>{' '}
                    <Link
                      className='text-green-700'
                      href='tel:+0899855599'
                      target='_blank'
                    >
                      1900 2126
                    </Link>{' '}
                    hoặc <strong>Email:</strong>{' '}
                    <Link
                      href='mailto:feedback@vgcorp.vn?'
                      target='_blank'
                      className='text-green-700'
                    >
                      feedback@vgcorp.vn
                    </Link>
                  </li>
                </ul>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Chính sách giao nhận' key='tab4'>
              <div className='text-justify'>
                <ul className='list-disc'>
                  <li>
                    Khách Hàng phải cung cấp thông tin chính xác trong quá trình
                    điền thông tin đơn hàng. Thông tin đơn hàng sẽ là cơ sở để
                    VG Corp và Khách Hàng lưu trữ thông tin mua hàng và hỗ trợ
                    cho việc sử dụng dịch vụ sau này của Khách Hàng.
                  </li>
                  <li>
                    Sau khi Khách Hàng hoàn tất thanh toán, thông tin đơn hàng
                    và xác nhận mua hàng thành công sẽ được gửi đến email hoặc
                    số điện thoại mà Khách Hàng đã đăng ký khi tiến hành mua
                    hàng trong vòng 24h. Khách Hàng có thể bắt đầu kích hoạt sử
                    dụng dịch vụ ngay sau khi nhận được xác nhận mua hàng thành
                    công.
                  </li>
                  <li>
                    Trường hợp Khách Hàng không nhận được thông tin xác nhận mua
                    hàng thành công trong thời hạn trên hoặc thông tin mua hàng
                    không chính xác, Khách Hàng vui lòng liên hệ với Bộ phận
                    chăm sóc khách hàng của VG Corp qua{' '}
                    <strong>Hotline:</strong>{' '}
                    <Link
                      className='text-green-700'
                      href='tel:+0899855599'
                      target='_blank'
                    >
                      1900 2126
                    </Link>{' '}
                    hoặc <strong>Email:</strong>{' '}
                    <Link
                      href='mailto:feedback@vgcorp.vn?'
                      target='_blank'
                      className='text-green-700'
                    >
                      feedback@vgcorp.vn
                    </Link>
                  </li>
                </ul>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Phương thức thanh toán' key='tab5'>
              <div className='text-justify'>
                <ul>
                  Khách hàng thanh toán đơn hàng bằng cách chuyển khoản vào tài
                  khoản ngân hàng của Chúng tôi bằng cách quét mã QR tại bước
                  thanh toán hoặc nhập thông tin nhận thanh toán như sau:
                  <li>
                    <strong>1. Đối với Sản phẩm Mã đẹp VGA</strong>
                  </li>
                  <li>
                    - Ngân hàng thụ hưởng: <strong>NGÂN HÀNG TMCP NAM Á</strong>
                  </li>
                  <li>
                    - Số tài khoản: <strong>111797955</strong>{' '}
                  </li>
                  <li>- Tên người nhận: <strong>CÔNG TY CỔ PHẦN VIỆT NAM GOLF</strong> </li>
                </ul>
                <ul>
                  <strong> 2. Đối với Dịch vụ Phí Hội viên</strong>
                  <li>
                    - Ngân hàng thụ hưởng: <strong>NGÂN HÀNG TMCP NAM Á</strong>
                  </li>
                  <li>
                    - Số tài khoản: <strong>188889999</strong>
                  </li>
                  <li>
                    - Tên người nhận:{' '}
                    <strong>CÔNG TY CỔ PHẦN VIỆT NAM GOLF</strong>
                  </li>
                  <li>
                    Sau khi Khách Hàng chuyển khoản thành công, VG Corp sẽ tiến
                    hành kiểm tra và xác nhận đơn hàng thanh toán thành công.
                  </li>
                  <li>
                    VG Corp sẽ tiền hành gửi thông báo xác nhận thanh toán đơn
                    hàng thành công thông qua email và số điện thoại mà Khách
                    Hàng cung cấp qua thông tin đơn hàng.
                  </li>
                  <li className='italic	'>
                    <strong>Lưu ý:</strong> VG Corp không chịu trách nhiệm về
                    sai sót trong quá trình chuyển khoản hoặc chuyển khoản sai
                    thông tin. Trường hợp xảy ra sai sót, Khách Hàng nên chủ
                    động làm việc trực tiếp với ngân hàng để giải quyết. Mọi chi
                    tiết thắc mắc Khách Hàng có thể liên hệ hỗ trợ với Chúng tôi
                    qua <strong>Hotline:</strong>{' '}
                    <Link
                      className='text-green-700'
                      href='tel:+0899855599'
                      target='_blank'
                    >
                      1900 2126
                    </Link>{' '}
                    hoặc <strong>Email:</strong>{' '}
                    <Link
                      href='mailto:feedback@vgcorp.vn?'
                      target='_blank'
                      className='text-green-700'
                    >
                      feedback@vgcorp.vn
                    </Link>
                  </li>
                </ul>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Space>
      </div>
    </div>
  )
}
