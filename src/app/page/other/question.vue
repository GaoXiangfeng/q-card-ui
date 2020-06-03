<!-- 常见问题 -->
<template>
    <div class="question-box">
        <div class="detail" v-for="(item,index) in data" :key="index">
            <div class="question">
                <span class="out">
                    {{index+1}}、{{item.question}}
                </span>
            </div>
            <div class="answer">
                {{item.answer}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            quetionText: {},
            data: [
                {
                    question: 'Tentang Q-Card?',
                    answer: 'Q-Card merupakan produk Kartu Kredit Virtual. Peminjam diberikan batas kredit dan menggunakannya untuk berbelanja, Nikmati pengalaman “Beli Sekarang, Bayar Nanti” saat berbelanja. '
                },
                {
                    question: 'Batas Kredit?',
                    answer: 'Q-Card memberikan batas kredit yang berbeda untuk setiap peminjam melalui perhitungan model data berdasarkan risiko kredit dari peminjam.'
                },
                {
                    question: 'Cara Aktivasi Q-Card?',
                    answer: 'Setelah mendapatkan data dan kualifikasi peminjam, dapat menyelesaikan aktiviasi platform ketika Anda memasuki Q-Card. Kemudian, Anda dapat melengkapi kata sandi pembayaran, pengaturan tanggal pembayaran, dan informasi tambahan. '
                },
                {
                    question: 'Bagaimana cara menggunakannya?',
                    answer: 'Peminjam yang berhasil diaktifkan dapat memilih pembayaran Q-Card melalui Metode Pembayaran.'
                },
                {
                    question: 'Kapan jumlah tagihan akan dikirim?',
                    answer: 'Tanggal pembuatan tagihan bulanan akan dilakukan 10 hari sebelum tanggal pembayaran, dan akan ada perbedaan maksimum 1-3 hari dalam pembuatan tagihan di setiap bulannya. '
                },
                {
                    question: 'Kapan saya harus melunasi tagihan?',
                    answer: 'Tanggal pembayaran kembali adalah tanggal pembayaran terakhir dari tagihan bulanan. Anda dapat memilih tanggal pembayaran ketika Q-Card telah diaktifkan.'
                },
                {
                    question: 'Apa itu tagihan?',
                    answer: 'Tagihan mengacu pada jumlah semua pengeluaran dan biaya peminjam dimulai dari hari penagihan bulan sebelumnya ke hari sebelum tanggal penangihan saat ini.'
                },
                {
                    question: 'Apa itu cicilan tagihan?',
                    answer: 'Ketika jumlah tagihan mencapai jumlah angsuran minimum, sistem secara otomatis mengubah tagihan menjadi cicilan dan membagi tagihan secara 3 periode tagihan, dan periode pertama dihitung dalam tagihan saat ini.'
                },
                {
                    question: 'Apakah saya dikenai biaya keterlambatan?',
                    answer: 'Anda mendapatkan fasilitas pinjaman tanpa bunga selama 40 hari pertama, biaya tertentu akan dikenakan apabila tagihan dibayar dengan cara diangsur, dan biaya jatuh tempo akan dikenakan jika tagihan tidak dibayar saat jatuh tempo.'
                },
                {
                    question: 'Apakah saya bisa melakukan pembayaran lebih awal?',
                    answer: 'Q-Card tidak mendukung pembayaran lebih awal. Pembayaran akan diproses setelah tagihan dihasilkan.'
                },
                {
                    question: 'Bagaimana cara menangani jumlah pengembalian uang?',
                    answer: 'Sesuai dengan tanggal pengembalian, Q-card akan menagih pengembalian uang ke tagihan bulanan yang berbeda dan memberikan prioritas untuk membayar kembali jumlah yang harus dilunasi.'
                },
            ],
            backObj: {}
        }
    },

    components: {},

    computed: {},

    methods: {},

    mounted () {
    }
}

</script>
<style lang='less' scoped>
@import '../../../styles/_var.less';
    .question-box{
        padding: 24px 36px 24px 22px;
        .detail{
            font-size: 15px;
            margin-bottom: 24px;
            .question{
                color: #333333;
                font-weight: 40;
                margin-bottom: 8px;
                .out{
                    word-break: keep-all;
                    text-align: justify;
                } 
            }
            .answer{
                color: #999;
                text-align: justify;
                word-break: keep-all;
            }
            @media (min-width: 640px) {
                .answer{
                    p:first-child{
                        width: 10%;
                    }
                }
            }
        }
    }
</style>