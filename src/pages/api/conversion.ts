// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Conversion } from '@/data/conversion';

type Data = Array<Conversion>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    res.status(200).json([
        { 
            media: {
                name: "kakao"
            },
            event: {
                name: "장바구니 보기"
            },
            trigger: {
                name: "광고 영역 클릭"
            }
        },
        {
            media: {
                name: "naver"
            },
            event: {
                name: "장바구니 구매"
            },
            trigger: {
                name: "구매하기 버튼 클릭"
            }
        }
    ]);
}