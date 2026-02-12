import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load prod envs pulled via `vercel env pull .env.production.local`
dotenv.config({ path: '.env.production.local' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  const description =
    'In 1997, South Dakota State football was your everyday Division II program. Twenty-six years later, they were Division I national champions. This is the story of coach John "Stig" Stiegelmeier — the man who led the way — and the overlooked recruits who defied the odds, survived the grim transition to Division I, and steadily built a powerhouse program in the frozen plains of South Dakota. Discover how a program nobody seemed to believe in became the team nobody could beat. With over 150 interviews with Stig, former players and coaches, this is the definitive book on SDSU Football.';

  const bioShort = 'Tanner Castora grew up in Strongsville, Ohio, a suburb of Cleveland.';
  const bioFull = `Tanner Castora grew up in Strongsville, Ohio, a suburb of Cleveland. After graduating from Strongsville High School, he attended South Carolina Upstate on a full athletic scholarship for basketball.

A year later, Tanner transferred to Kent State University in Northeast Ohio, where he was a part of the Golden Flashes basketball team that advanced to the Men’s NCAA Tournament. The following year he shifted his focus from basketball to broadcasting after being hired as the color analyst for the Kent State basketball telecasts on ESPN 3. He occasionally filled in as the play-by-play broadcaster as well before graduating from Kent State with a journalism degree in 2020.

In 2021, he was hired by KELOLAND, the CBS affiliate in Sioux Falls, South Dakota, where he became an Emmy nominated sports reporter and sports anchor. Since finishing his two-year contract with KELOLAND in 2023, he has worked to establish himself as an independent and freelance journalist and broadcaster. With thousands of followers on his Medium page (an online publishing platform), Tanner has been credentialed to cover several events as an independent journalist, including the Men’s 2024 NCAA Tournament in Omaha, Nebraska, and the 2024 NFL Hall of Fame Game in Canton, Ohio. He has also done play-by-play work for Big Sioux Media and hosts a weekly sports radio show on Brookings Radio—all while writing this biography.

Tanner is a believer and follower of Jesus Christ.`;

  console.log('🔄 Updating content via Supabase...');

  const { error: bookErr } = await supabase
    .from('Book')
    .update({ tagline: description, description })
    .eq('id', 1);
  if (bookErr) throw bookErr;

  const { error: authorErr } = await supabase
    .from('Author')
    .update({ bioShort, bioFull })
    .eq('id', 1);
  if (authorErr) throw authorErr;

  console.log('✅ Content updated');
}

main().catch((e) => {
  console.error('❌ Update failed:', e);
  process.exit(1);
});

