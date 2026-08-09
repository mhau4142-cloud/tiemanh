// Nguồn dữ liệu duy nhất cho 3 dịch vụ — dùng chung cho /bang-gia và 3 trang dịch vụ
export interface ServicePackage {
  name: string;
  price: string;
  includes: string[];
}

export interface Service {
  slug: string;
  category: string; // khớp với category trong src/content/gallery
  title: string;
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  intro: string[];
  includes: string[];
  packages: ServicePackage[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "chup-ky-yeu",
    category: "Kỷ yếu & sự kiện",
    title: "Chụp kỷ yếu & sự kiện",
    seoTitle: "Chụp kỷ yếu & sự kiện tại Hà Nội — Tiệm Ảnh",
    seoDescription:
      "Chụp kỷ yếu lớp, lễ tốt nghiệp, sự kiện, workshop tại Hà Nội. Ekip trẻ, giá trọn gói từ 3,9 triệu/lớp, trả ảnh đúng hẹn. Gọi 0868 868 238.",
    tagline: "Cười thật, quậy thật — không dàn dựng gượng gạo",
    intro: [
      "Kỷ yếu là bộ ảnh mà mười năm nữa cả lớp vẫn mở ra xem lại. Vì thế Tiệm không chụp kiểu xếp hàng ngay ngắn rồi hô một-hai-ba: ekip sẽ đi cùng lớp bạn cả buổi, bắt những khoảnh khắc thật — lúc cả đám cười lăn vì một câu đùa, lúc đứa bạn thân khóc nhè, lúc thầy cô bị kéo vào tạo dáng cùng.",
      "Tiệm nhận kỷ yếu lớp, kỷ yếu khoa, lễ tốt nghiệp và cả sự kiện, workshop, year-end party của công ty. Concept có sẵn để chọn hoặc lớp bạn tự nghĩ — càng lạ Tiệm càng thích. Giá chốt trọn gói từ đầu, không phát sinh giữa buổi.",
    ],
    includes: [
      "Kỷ yếu lớp, kỷ yếu khoa",
      "Lễ tốt nghiệp",
      "Sự kiện công ty, year-end party",
      "Workshop, talkshow",
      "Concept kỷ yếu theo chủ đề riêng",
    ],
    packages: [
      {
        name: "Gói kỷ yếu cơ bản",
        price: "Từ 3.900.000đ / lớp",
        includes: [
          "3 giờ chụp, 1 địa điểm",
          "2 ảnh hậu kỳ / thành viên + ảnh nhóm",
          "Toàn bộ ảnh gốc",
        ],
      },
      {
        name: "Gói kỷ yếu trọn gói",
        price: "Từ 8.900.000đ / lớp",
        includes: [
          "Cả ngày, nhiều địa điểm",
          "Trang phục + phụ kiện concept",
          "Video highlight ngắn",
        ],
      },
      {
        name: "Sự kiện / workshop",
        price: "Từ 800.000đ / giờ",
        includes: [
          "Tối thiểu 2 giờ, giảm giá theo buổi",
          "Trả ảnh nhanh trong 48 giờ",
          "Ảnh đăng ngay cho fanpage",
        ],
      },
    ],
    faqs: [
      {
        question: "Lớp đông 40-50 bạn thì chụp thế nào cho đủ?",
        answer:
          "Gói kỷ yếu tính theo lớp, không giới hạn số thành viên. Mỗi bạn đều có ảnh cá nhân hậu kỳ riêng, cộng thêm ảnh nhóm và ảnh cả lớp.",
      },
      {
        question: "Trời mưa đúng ngày chụp thì sao?",
        answer:
          "Buổi chụp ngoài trời gặp thời tiết xấu được dời miễn phí sang ngày gần nhất mà lớp và ekip cùng rảnh.",
      },
      {
        question: "Có hỗ trợ thuê trang phục, phụ kiện không?",
        answer:
          "Gói trọn gói đã gồm trang phục và phụ kiện theo concept. Gói cơ bản có thể đặt thêm — Tiệm gửi bảng chọn trước buổi chụp.",
      },
    ],
  },
  {
    slug: "chup-chan-dung",
    category: "Chân dung & profile",
    title: "Chụp chân dung & profile",
    seoTitle: "Chụp ảnh chân dung, ảnh profile tại Hà Nội — Tiệm Ảnh",
    seoDescription:
      "Chụp ảnh thẻ, ảnh hồ sơ, chân dung nghệ thuật, profile doanh nhân tại Hà Nội. Studio ánh sáng chuẩn, hậu kỳ tự nhiên, lấy ngay trong buổi. Gọi 0868 868 238.",
    tagline: "Chỉn chu từ ánh sáng đến hậu kỳ",
    intro: [
      "Một tấm chân dung tốt phải trông giống bạn — phiên bản tự tin nhất. Tiệm không kéo da mịn như búp bê hay chỉnh đến mức đồng nghiệp nhìn không ra; ánh sáng được xếp riêng cho từng gương mặt, hậu kỳ giữ chất da thật, và bạn được xem ảnh ngay tại chỗ để chọn tấm ưng nhất.",
      "Từ ảnh thẻ lấy ngay, ảnh hồ sơ xin việc, đến bộ profile doanh nhân dùng cho LinkedIn và website công ty hay chân dung nghệ thuật làm quà cho chính mình — Tiệm đều có gói phù hợp. Chưa biết mặc gì? Nhắn trước, Tiệm tư vấn trang phục miễn phí.",
    ],
    includes: [
      "Ảnh thẻ, ảnh hồ sơ",
      "Profile doanh nhân, LinkedIn",
      "Chân dung nghệ thuật",
      "Ảnh gia đình trong studio",
      "Trang điểm & làm tóc (đặt thêm)",
    ],
    packages: [
      {
        name: "Ảnh thẻ & hồ sơ",
        price: "Từ 150.000đ",
        includes: [
          "Chụp tại studio, chỉnh sửa tự nhiên",
          "File in đủ kích cỡ + file mềm",
          "Lấy ngay trong buổi",
        ],
      },
      {
        name: "Chân dung nghệ thuật",
        price: "Từ 1.500.000đ",
        includes: [
          "Lên concept + ánh sáng riêng",
          "10 ảnh hậu kỳ kỹ",
          "Trang điểm (đặt thêm)",
        ],
      },
      {
        name: "Profile doanh nhân",
        price: "Từ 2.500.000đ",
        includes: [
          "Chụp tại studio hoặc văn phòng của bạn",
          "Bộ ảnh dùng cho LinkedIn, website, báo chí",
          "Tư vấn trang phục trước buổi chụp",
        ],
      },
    ],
    faqs: [
      {
        question: "Ảnh thẻ có lấy ngay được không?",
        answer:
          "Có. Ảnh thẻ và ảnh hồ sơ chụp xong chọn ảnh, chỉnh nhẹ và in ngay trong buổi — thường 15-20 phút là xong.",
      },
      {
        question: "Tôi không biết tạo dáng thì sao?",
        answer:
          "Đó là việc của Tiệm. Ekip sẽ hướng dẫn từng dáng, từng góc mặt trong suốt buổi chụp — đa số khách 'không ăn ảnh' đều bất ngờ với kết quả.",
      },
      {
        question: "Chụp profile cho cả đội ngũ công ty được không?",
        answer:
          "Được — Tiệm mang studio mini đến tận văn phòng, chụp đồng bộ ánh sáng và phông nền cho cả team. Báo giá theo số người, liên hệ để nhận báo giá riêng.",
      },
    ],
  },
  {
    slug: "chup-da-ngoai",
    category: "Chụp tự do & dã ngoại",
    title: "Chụp tự do & dã ngoại",
    seoTitle: "Chụp ảnh dã ngoại, chụp theo yêu cầu tại Hà Nội — Tiệm Ảnh",
    seoDescription:
      "Thuê thợ chụp ảnh đi picnic, du lịch, chụp phố, concept tự do tại Hà Nội và các tỉnh. Giá từ 1,8 triệu/buổi, đi theo mọi chuyến. Gọi 0868 868 238.",
    tagline: "Bạn chọn địa điểm, Tiệm lo phần còn lại",
    intro: [
      "Có những buổi đi chơi đáng nhớ đến mức điện thoại không đủ để giữ lại. Tiệm nhận đi theo mọi kế hoạch của bạn: buổi picnic cuối tuần, chuyến Đà Lạt với hội bạn thân, một vòng phố cổ lúc sáng sớm, hay một concept lạ mà bạn nghĩ mãi chưa ai chụp.",
      "Ekip đi nhẹ, chụp nhanh, không bắt bạn dừng lại tạo dáng mười phút mỗi điểm — cứ chơi tự nhiên, ảnh đẹp là việc của Tiệm. Chi phí di chuyển ngoài thành phố luôn được báo rõ trong báo giá, chốt trước khi đi, không phát sinh dọc đường.",
    ],
    includes: [
      "Đi theo yêu cầu trong và ngoài thành phố",
      "Picnic, du lịch, phượt",
      "Chụp phố, chụp đời thường",
      "Concept tự do theo ý tưởng của bạn",
      "Flycam (đặt thêm)",
    ],
    packages: [
      {
        name: "Nửa ngày trong thành phố",
        price: "Từ 1.800.000đ",
        includes: [
          "Tối đa 4 giờ, địa điểm bạn chọn",
          "20 ảnh hậu kỳ",
          "Toàn bộ ảnh gốc",
        ],
      },
      {
        name: "Cả ngày / ngoại thành",
        price: "Từ 3.500.000đ",
        includes: [
          "Đi cùng cả ngày, không giới hạn địa điểm",
          "Chi phí di chuyển tính riêng, báo trước",
          "Video ngắn kèm theo (đặt thêm)",
        ],
      },
      {
        name: "Theo chuyến / du lịch",
        price: "Báo giá riêng theo chuyến",
        includes: [
          "Ekip đi theo chuyến du lịch của bạn",
          "Lịch trình + chi phí thống nhất trước",
          "Báo giá riêng theo từng chuyến",
        ],
      },
    ],
    faqs: [
      {
        question: "Tiệm có đi tỉnh xa không? Chi phí tính thế nào?",
        answer:
          "Có — đây là dịch vụ tủ của Tiệm. Chi phí di chuyển và lưu trú (nếu có) được báo rõ trong báo giá, chốt trước chuyến đi, không phát sinh dọc đường.",
      },
      {
        question: "Nhóm đông người có chụp được không?",
        answer:
          "Được, từ cặp đôi đến nhóm 20-30 người. Nhóm đông Tiệm sẽ thêm thợ phụ để không ai bị 'ra rìa' trong ảnh — báo trước số người để Tiệm xếp ekip.",
      },
      {
        question: "Bao lâu nhận được ảnh sau chuyến đi?",
        answer:
          "Ảnh gốc gửi trong 24-48 giờ để bạn đăng ngay. Ảnh hậu kỳ trả trong 5-7 ngày tùy số lượng.",
      },
    ],
  },
];
