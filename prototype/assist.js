/* Niveshak Saathi assistant. Local, auditable rules only: no network, no storage, no statistical model.
   understandIncident(text): suggests Emergency-mode answers from the person's own words (English, Hindi, Roman Hindi).
   annualise / fromAmounts / explainReturn: plain yearly maths for a promised return.
   payCheck(input): the "Before you pay" check, with stop reasons and official ways to verify, each tied to a source id.
   Every output is a suggestion for the person to confirm. A wrong pre-fill is worse than none, so rules stay conservative. */
(function(root){
'use strict';
// Whole-word matching on clauses padded with single spaces (JavaScript \b does not work for Devanagari).
const R=s=>new RegExp('(?:^| )(?:'+s+')(?= |$)','g');
function all(re,c){const out=[];let m;re.lastIndex=0;while((m=re.exec(c))){const l=m[0][0]===' '?1:0;out.push({s:m.index+l,e:m.index+m[0].length,t:m[0].slice(l)})}return out}
const has=(re,c)=>{re.lastIndex=0;return re.test(c)};

// ---------- 1. understandIncident ----------
// Only completed ("did") verb forms count, so "bhejna hai", "should I share" or "kya OTP batana chahiye" never count as done.
const rD='(?:diya|diye|dia|die|di|chuka|chuke|chuki)',rL='(?:liya|liye|lia|lie|li)',rG='(?:gaya|gaye|gayi|gya|gye|gyi|gai|gae)';
const rDONE=`(?:kiya|kiye|kia|kie|kar ?${rD}|kr ?${rD}|kar ?${rL}|kr ?${rL}|ho ?${rG}|ho ?chuka|hua|hue|hui|huye|ki(?= (?:hai |thi |tha |h )?$))`;
const dD='(?:दिया|दिए|दिये|दी|चुका|चुके|चुकी)',dL='(?:लिया|लिए|लिये|ली)',dG='(?:गया|गए|गये|गई|गयी)';
const dDONE=`(?:किया|किए|किये|कर ?${dD}|कर ?${dL}|हो ?${dG}|हो ?चुका|हुआ|हुए|हुई|की(?= (?:है |थी |था )?$))`;
const NUM='\\d+(?:\\.\\d+)?';
const V={
 give:R(`bhej ?${rD}|bheja|bheje|bheji|bhejaa|de ?${rD}|diya|diye|dia|daal ?${rD}|dal ?${rD}|dala|daala|dale|daale|dali|daali|bhar ?${rD}|bhara|bhari|bhare|send ?${rDONE}|jama ?${rDONE}|sent|gave|given|put|भेज ?${dD}|भेजा|भेजे|भेजी|दे ?${dD}|दिया|दिए|दिये|डाल ?${dD}|डाला|डाले|डाली|भर ?${dD}|भरा|भरी|भरे|सेंड ?${dDONE}|जमा ?${dDONE}`),
 tell:R(`bata ?${rD}|bta ?${rD}|bataya|batayi|bataye|batai|btaya|(?:share|forward|enter|type) ?${rDONE}|likh ?${rD}|likha|dikha ?${rD}|dikhaya|dikhayi|dikhai|shared|told|forwarded|entered|typed|disclosed|revealed|provided|showed|read out|बता ?${dD}|बताया|बताई|बताए|बताये|(?:शेयर|साझा|फॉरवर्ड|एंटर|टाइप) ?${dDONE}|लिख ?${dD}|लिखा|दिखा ?${dD}|दिखाया|दिखाई`),
 invest:R(`(?:invest|nivesh) ?${rDONE}|laga ?${rD}|lagaye|lagaya|lagae|lagai|invested|लगा ?${dD}|लगाए|लगाये|लगाया|लगाई|(?:निवेश|इन्वेस्ट|इनवेस्ट) ?${dDONE}`),
 debit:R(`(?:kat|kaat|katt|cut|deduct|debit) ?(?:${rG}|${rL}|ho ?${rG})|kate|kata|nikal ?(?:${rG}|${rL})|nikaal ?${rL}|chale ?(?:gaye|gye|gae)|chala ?(?:gaya|gya)|doob ?${rG}|dub ?${rG}|(?:gawa|ganwa|gava) ?${rD}|gawaye|gavaye|gawaya|lost|debited|deducted|withdrawn|taken|stolen|cut|कट ?(?:${dG}|${dL})|कटे|कटा|निकल ?${dG}|निकाल ?${dL}|चले ?(?:गए|गये)|चला ?गया|डूब ?${dG}|गंवा ?${dD}|गंवाए|गंवाये|डेबिट ?(?:हो ?)?${dG}`),
 gone:R(`gaye|gaya|gye|gya|गए|गया|गये`),
 take:R(`le ?(?:${rL}|${rG})|took|stole|ले ?(?:${dL}|${dG})`),
 open:R(`(?:click|clik|klik|tap|press|open|visit) ?${rDONE}|khola|kholi|khole|khol ?(?:${rD}|${rL})|daba ?${rD}|dabaya|dabai|clicked|tapped|pressed|opened|visited|(?:क्लिक|टैप|ओपन|विजिट) ?${dDONE}|खोला|खोली|खोले|खोल ?(?:${dD}|${dL})|दबा ?${dD}|दबाया|दबाई`),
 install:R(`(?:install|instal|download|downlod|dawnload|donload) ?${rDONE}|installed|downloaded|(?:इंस्टॉल|इंस्टाल|इन्स्टॉल|इनस्टॉल|इंस्टल|डाउनलोड) ?${dDONE}`),
 buy:R(`bought|purchased|kharid ?${rD}|kharida|kharide|kharidi|खरीद ?${dD}|खरीदा|खरीदे|खरीदी`),
 come:R(`aaya|aya|aayi|ayi|aai|aaye|aye|aae|aa ?(?:${rG}|raha|rahe|rahi|rha|rhe|rhi|chuka)|aata|aate|aati|mila|mili|mile|received|got|get|getting|gets|came|comes|coming|आया|आई|आए|आये|आ ?(?:${dG}|रहा|रहे|रही)|आता|आते|आती|मिला|मिली|मिले`)
};
const O={
 money:R(`paise|paisa|paisey|pese|paiso|paison|rupaye|rupaiye|rupay|rupees?|rs|₹|money|amount|payment|payments|funds?|rakam|raqam|rashi|fees?|charges?|tax|deposit|savings|cash|${NUM} ?(?:k|lakh|lakhs|lac|lacs|crore|crores|cr|hazaar|hazar|hajar|thousand|rupees|rupaye|हजार|लाख|करोड|रुपये|रुपए)|\\d{3,8}(?:\\.\\d+)?|(?:ek|do|teen|char|chaar|paanch|panch|das|bees|pachas|one|two|three|four|five|ten|twenty|fifty|एक|दो|तीन|चार|पांच|दस|बीस|पचास) (?:sau|hazaar|hazar|hajar|thousand|lakh|lac|hundred|सौ|हजार|लाख)|पैसे|पैसा|रुपये|रुपए|रुपया|रकम|राशि|धनराशि|फीस|शुल्क|टैक्स|भुगतान|पेमेंट|बचत|(?:upi|upi id|gpay|google pay|phonepe|paytm|bhim|card|account|khate|wallet|यूपीआई|कार्ड|खाते|अकाउंट|वॉलेट) (?:se|me|mein|main|pe|par|से|में|पर)`),
 cred:R(`otp|otps|pin(?! ?code)|pins|upi pin|mpin|m pin|atm pin|password|passwords|pasword|passcode|cvv|card (?:number|details|detail)|card (?:ki|ke) details|card ka number|net ?banking (?:password|details|id|login)|login (?:details|id|password)|user ?id|anydesk(?: code| id)?|any desk|teamviewer|team viewer|quick ?support|rust ?desk|air ?droid|ultra ?viewer|remote (?:access|control)|screen(?: access| control)?|(?:otp|verification|security|(?:\d+|four|six|eight|nine|ten) digit) code|code (?:on|from|shown on) (?:the |my )?(?:screen|phone|mobile)|ओटीपी|पिन(?! ?कोड)|एमपिन|पासवर्ड|सीवीवी|कार्ड (?:नंबर|नम्बर|की डिटेल|के डिटेल|डिटेल)|स्क्रीन(?: एक्सेस)?|रिमोट एक्सेस|एनीडेस्क`),
 link:R(`link|links|lnk|url|website|site|web site|webpage|web page|page|attachment|apk|ad|advertisement|notification|लिंक|वेबसाइट|साइट|पेज|अटैचमेंट|एपीके|विज्ञापन`),
 app:R(`app|apps|application|apk|software|anydesk|any desk|teamviewer|team viewer|quick ?support|rust ?desk|air ?droid|ultra ?viewer|ऐप|एप|एप्प|ऍप|एप्लीकेशन|एप्लिकेशन|एपीके|सॉफ्टवेयर|एनीडेस्क`),
 gift:R(`crypto|bitcoin|btc|usdt|tether|ethereum|gift ?cards?|vouchers?|क्रिप्टो|बिटकॉइन|गिफ्ट कार्ड`),
 msg:R(`calls?|phone|phone call|fon|missed call|video call|whatsapp call|voice call|messages?|msgs?|massage|sms|texts?|emails?|mail|whatsapp|telegram|link|links|notification|request|collect request|letter|notice|otp|कॉल|काल|फोन|मैसेज|मेसेज|संदेश|एसएमएस|ईमेल|मेल|व्हाट्सएप|वॉट्सऐप|टेलीग्राम|लिंक|नोटिस|ओटीपी`)
};
// [situation, verb, object, largest word gap, condition]
const PAIRS=[['paid','give','money',4,'give'],['paid','invest','money',4,'give'],['paid','buy','gift',3,'give'],['paid','debit','money',3,''],['paid','gone','money',0,''],['paid','take','money',3,'fromme'],
 ['shared','give','cred',4,'give'],['shared','tell','cred',4,'give'],['shared','take','cred',3,''],
 ['clicked','open','link',3,''],['clicked','install','app',4,''],['received','come','msg',3,''],['received','give','msg',4,'tome']];
const ALONE=[
 ['paid',R(`(?:pay|payment|pyment|paymnt|paymant|bhugtan|transfer|trasfer|transfar|invest|deposit) ?${rDONE}|paid|transferred|deposited|invested|made (?:a |the |an |one |two |\\d+ )?(?:upi |online |bank )?payments?|payments? (?:was |were |has been |have been |got |is |went )?(?:made|done|completed|complete|successful|sent|processed|through)|(?:पेमेंट|भुगतान|पे|ट्रांसफर|ट्रान्सफर|इन्वेस्ट|इनवेस्ट|निवेश|डिपॉजिट) ?${dDONE}`),'give'],
 ['paid',R(`(?:debit|deduct) ?${rDONE}|debited|deducted|(?:account|khata|khate|wallet|खाता|खाते) (?:\\S+ )?(?:khali|खाली) ?(?:${rDONE}|${dDONE})|payments? (?:was |were |has been |have been |got )?(?:debited|deducted)|lost (?:my |all my |all |the )?(?:money|savings|₹|rs|rupees|${NUM})|${NUM} (?:ka|ki|ke|का|की|के) (?:fraud|froud|dhokha|dhoka|scam|thagi|chuna|फ्रॉड|फ्राड|धोखा|ठगी|स्कैम)|(?:scammed|cheated|duped|defrauded|conned) (?:of|for|out of) (?:₹ |rs )?\\d+|डेबिट ?${dDONE}`),''],
 ['shared',R(`shared (?:my |the |our )?screen|screen ?shar(?:ing|e) (?:is |was )?(?:still )?(?:on|started|running|active|going on)|(?:gave|given|allowed|granted) (?:him |her |them |the caller |someone )?(?:remote|screen|phone) access|screen ?share (?:on |chalu |start |shuru )?${rDONE}|screen ?share (?:chal|chalu|on) (?:raha|rha|rahi|rhi|hai|h|tha|thi)|स्क्रीन ?शेयर (?:चालू |शुरू |ऑन )?${dDONE}|स्क्रीन ?शेयर (?:चल|चालू|ऑन) (?:रहा|रही|है|था|थी)`),''],
 ['received',R(`(?:called|calling|messaged|messaging|texted|texting|contacted|emailed|pinged|approached|whatsapped|rang|added|reached out to|dmed) (?:me|us)|(?:keeps?|kept|is|was|are|were) (?:on )?(?:asking|calling|messaging|texting|demanding|threatening)|(?:call|calls|message|messages|sms|text|email|mail) from|(?:asked|asking|demanded|demanding|requested|requesting) (?:me |us )?(?:for|to)|(?:maang|mang|maag)(?:a|e|i|aa|ta|te|ti)|(?:maang|mang) (?:raha|rahe|rahi|rha|rhe|rhi)|(?:group|grup) (?:me|mein|main) add ?${rDONE}|(?:someone|somebody|a man|a woman|a person|a guy|a lady|he|she|they|scammer|fraudster|caller|unknown number) (?:called|messaged|texted|contacted|emailed|rang|sent)|मांग(?:ा|े|ी)|मांग (?:रहा|रहे|रही)|ग्रुप में (?:ऐड|जोड) ?(?:${dDONE}|ा|ी|े|दिया)`),''],
 ['received',R(`(?:call|phone|fon|message|msg|sms|whatsapp|text|mail|email|video call) ?(?:${rDONE}|kara|karwaya|karke|krke|(?:kar|kr) (?:raha|rahe|rahi|rha|rhe|rhi))|kaha|bola|boli|bole|(?:कॉल|फोन|मैसेज) ?(?:${dDONE}|कर (?:रहा|रहे|रही))|कहा|बोला|बोली`),'third'],
 // Real-world user test real-world stories: money taken rather than sent ("2 debits came", "unauthorised transactions"), screen access
 // in plain words ("he could see my phone"), and Hinglish "app dala" (installed the app).
 ['paid',R(`(?:${NUM}|one|two|three|four|five|several|multiple|many|kuch|kai|do|teen|char|chaar|दो|तीन|चार|कई) (?:unauthori[sz]ed |fraud |fraudulent |fake |unknown |galat )?(?:debits|deductions|withdrawals|debit (?:sms|messages|alerts))|debits? (?:of|for) (?:rs |₹ )?${NUM}|(?:unauthori[sz]ed|fraudulent|unknown) (?:debits?|transactions?|withdrawals?|deductions?|payments?)`),''],
 ['shared',R(`(?:he|she|they|the caller|caller|scammer|the agent|agent|someone|the man|the person) (?:could|can|was able to|started to|started|was|were) (?:see|seeing|view|viewing|control|controlling|access|accessing|operate|operating) (?:my|the) (?:phone|screen|mobile)|(?:mera|meri|mere) (?:phone|mobile|screen|fon) (?:dekh|chala|chalane) (?:raha|rahe|rahi|rha|rhe|rhi|sakta|sakte|sakti|liya|lia)|मेरा (?:फोन|मोबाइल|स्क्रीन) (?:देख|चला) (?:रहा|रहे|सकता|सकते|लिया)`),''],
 ['clicked',R(`(?:app|apk|anydesk|any desk|rust ?desk|teamviewer|team viewer|quick ?support|air ?droid) (?:bhi |phone (?:me|mein|main) |mobile (?:me|mein|main) )?(?:dalo |daalo )?(?:maine |mene )?(?:dala|daala|dali|daali|dal ?${rD}|daal ?${rD}|dal ?${rL}|daal ?${rL})|(?:ऐप|एप|एप्प|एपीके|एनीडेस्क) (?:मैंने )?(?:डाला|डाली|डाल ?${dD}|डाल ?${dL})`),'']
];
const THIRD=R(`usne|usney|unhone|unhon ne|isne|inhone|kisi ne|kisine|bank ne|company ne|scammer ne|caller ne|(?:he|she|they|someone|somebody|the caller|caller|scammer|fraudster|the bank) (?:\\S+ed|sent|took|got|gave|made|told|said|asked|called|has|had|is|was|were|are|keeps|kept|also|then|just|wants|wanted|says|will)|उसने|उन्होंने|इसने|इन्होंने|किसी ने|बैंक ने`);
const FIRST=R(`maine|mene|mainey|mai ne|main ne|humne|hamne|i|we|मैंने|मैने|हमने`);
const TOME=R(`mujhe|mujhko|muje|hume|humein|मुझे|मुझको|हमें`);
const INCOMING=R(`(?:sent|paid|gave|transferred|returned|refunded|credited) (?:me|us)|to me|got paid|(?:into|in|to) my (?:bank )?account|credited|credit (?:ho|hua|hue|hui)|mujhe|mujhko|muje|hume|humein|mere (?:account|khate|bank account) (?:me|mein|main|par|pe)|मुझे|मुझको|हमें|मेरे (?:खाते|अकाउंट|बैंक खाते) (?:में|पर)|क्रेडिट`);
const FROMME=R(`mujhse|mujh se|muj se|from me|from my|account se|khate se|card se|मुझसे|खाते से|अकाउंट से`);
const HYPO=R(`if|agar|yadi|in case|what if|suppose|maan lo|should|shall|could|would|can i|can we|may i|must|need to|have to|has to|is it safe|is it ok|is it okay|kya main|kya mai|kya mujhe|kya hum|kya hume|kya humein|chahiye|chaahiye|chahie|karun|karu|karoon|bhejun|bheju|bhejoon|bataun|batau|dun|doon|will|going to|gonna|about to|plan to|planning to|want to|wants to|wanted to|asked me to|told me to|asking me to|wants me to|अगर|यदि|चाहिए|करूं|करू|भेजूं|बताऊं|दूं|क्या मैं|क्या मुझे|क्या हम`);
const NEG=R(`not|never|no|nothing|none|neither|nor|without|nahi|nahin|nahee|nhi|na|mat|bina|नहीं|नही|न|ना|मत|बिना`);
const NEGPOST=R(`not|nahi|nahin|nahee|nhi|nothing|नहीं|नही|failed|fail|declined|unsuccessful|cancelled|canceled|rejected`);
// Looking back for a negation stops at a joining word or another finished verb ("OTP nahi diya par paise bheje").
const STOP=R(`par|pr|per|lekin|magar|but|aur|and|to|toh|phir|then|bas|sirf|diya|diye|di|kiya|kiye|ki|liya|liye|bheja|bheje|bataya|gaya|gaye|gayi|hua|hue|tha|thi|the|hai|पर|लेकिन|मगर|और|तो|फिर|बस|सिर्फ|दिया|दिए|दी|किया|किए|की|लिया|भेजा|भेजे|बताया|गया|गए|गई|हुआ|हुए|था|थी|थे|है`);
const ONGO_STILL=R('still|abhi bhi|ab bhi|abhi tak|ab tak|अभी भी|अब भी|अभी तक|अब तक');
const ONGO_CTX=R('call|calls|phone|line|screen|anydesk|access|message|messages|calling|asking|messaging|texting|threatening|connected|contact|group|chal|chalu|maang|mang|dhamki|कॉल|फोन|लाइन|स्क्रीन|एक्सेस|मैसेज|मांग|चल|चालू|धमकी|एनीडेस्क');
const ONGO_YES=R(`keeps? (?:on )?(?:calling|messaging|texting|asking|threatening|demanding|pressuring|harassing|sending)|kept (?:calling|messaging|asking)|(?:is|are) (?:still )?(?:calling|messaging|texting|asking|threatening|demanding|pressuring|harassing|on the (?:call|phone|line))|on (?:the )?(?:call|line|phone) (?:right )?now|baar baar|bar bar|lagatar|lagataar|(?:call|phone|line|fon) (?:pe|par) (?:hi )?(?:hai|hain|hu|hun|hoon|h|he)|(?:call|phone|fon|message|msg|sms|whatsapp|dhamki|pressure|tang|pareshan) (?:kar|de|aa) (?:raha|rahe|rahi|rha|rhe|rhi)|(?:maang|mang) (?:raha|rahe|rahi|rha|rhe|rhi)|लगातार|बार बार|(?:कॉल|फोन|लाइन) पर (?:ही )?(?:है|हैं|हूं)|(?:कॉल|फोन|मैसेज|धमकी) (?:कर|दे|आ) (?:रहा|रहे|रही)|मांग (?:रहा|रहे|रही)`);
const ONGO_RUN=R('(?:chal|chalu) (?:raha|rha|rahi|rhi)|(?:chalu|on) (?:hai|h)|(?:is|are) (?:still )?(?:on|running|active|going on)|still (?:on|running|active|going on)|चल (?:रहा|रही)|(?:चालू|ऑन) है');
const ONGO_RUNCTX=R('screen|anydesk|teamviewer|remote|share|sharing|video call|स्क्रीन|शेयर|एनीडेस्क|रिमोट');
const ONGO_NO=R(`hung up|hang up|cut the call|ended the call|call ended|disconnected|blocked (?:him|her|them|the number|the caller|that number|his number|their number|it)|uninstalled|deleted the app|removed the app|stopped (?:the )?screen ?shar(?:e|ing)|stopped sharing|left the group|exited the group|no longer|not anymore|stopped calling|(?:call|phone|fon) (?:kaat|kat|cut|band) ?(?:${rD}|${rDONE}|${rG})|block ?${rDONE}|(?:app|anydesk|apk) (?:uninstall|delete|remove|hata) ?(?:${rDONE}|${rD})|uninstall ?${rDONE}|screen ?share band ?${rDONE}|(?:group|grup) (?:chhod|chod) ?${rD}|(?:group|grup) (?:leave|left|exit) ?${rDONE}|ab (?:koi )?(?:call|contact|message|baat) (?:bhi )?(?:nahi|nhi)|(?:कॉल|फोन) (?:काट|कट|बंद) ?(?:${dD}|${dDONE}|${dG})|ब्लॉक ?${dDONE}|(?:ऐप|एप|एनीडेस्क) (?:अनइंस्टॉल|डिलीट|हटा) ?(?:${dDONE}|${dD})|अनइंस्टॉल ?${dDONE}|स्क्रीन ?शेयर बंद ?${dDONE}|ग्रुप (?:छोड) ?${dD}`);
const FAILED=R('fail|failed|declined|unsuccessful|cancel|cancelled|canceled|rejected|reversed|reverse|फेल|असफल|विफल|रद्द');
const NOTCONTACT=R('card|account|sim|upi|atm|कार्ड|खाता|खाते|अकाउंट|सिम');
const TODAY=R(`today|tonight|this morning|this afternoon|this evening|just now|right now|a while ago|(?:a few|few|couple of|two|some|\\d+) (?:minutes|mins|min) ago|(?:a few|few|couple of|two|three|some|[1-9]|1\\d|2[0-3]) (?:hours|hrs) ago|an hour ago|half an hour ago|earlier today|aaj|aj|abhi(?! bhi| tak| bhee)|abhi abhi|thodi (?:der|dair) pehle|kuch (?:der|dair) pehle|(?:\\d+|ek|do|teen|aadha|aadhe|adhe) ghante? (?:pehle|pahle|phle)|आज|अभी(?! भी| तक)|अभी अभी|थोडी देर पहले|कुछ देर पहले|(?:\\d+|एक|दो|तीन|आधा|आधे) घंटे? पहले`);
const NOWISH=R('abhi|abhi abhi|right now|just now|अभी|अभी अभी'); // the present moment: counts only inside the payment clause
const EARLIER=R(`yesterday|last night|day before yesterday|last (?:week|month|year|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend)|(?:\\d+|two|three|four|five|six|seven|few|a few|couple of|several|many) (?:days|weeks|months|years) ago|a (?:week|month|year|day) ago|the other day|pichle|pichhle|pichli|pichhli|picchle|(?:\\d+|do|teen|char|chaar|paanch|kuch|kai|ek) (?:din|dino|hafte|hafton|mahine|mahino|saal) (?:pehle|pahle|phle|pehele)|ek (?:hafta|mahina|saal) (?:pehle|pahle)|पिछले|पिछली|(?:\\d+|दो|तीन|चार|पांच|कुछ|कई|एक) (?:दिन|दिनों|हफ्ते|हफ्तों|सप्ताह|महीने|महीनों|साल) पहले|एक (?:हफ्ता|महीना|साल) पहले`);
const KAL=R('kal|kal raat|kal subah|kal shaam|parso|parson|parsoon|कल|परसों');
const PAST=R(`tha|thi|the|hua|hue|hui|huye|${rG}|kiya|kiye|kia|diya|diye|dia|liya|liye|bheja|bheje|bheji|aaya|aya|aayi|ayi|aaye|aye|khola|kholi|bataya|mila|mili|kata|kate|lagaye|lagaya|dala|daale|daala|paid|sent|transferred|clicked|opened|installed|downloaded|shared|gave|told|called|got|received|lost|was|were|did|happened|made|debited|deducted|had|went|came|invested|deposited|था|थी|थे|हुआ|हुए|हुई|${dG}|किया|किए|किये|दिया|दिए|दिये|लिया|लिए|भेजा|भेजे|भेजी|आया|आई|आए|आये|खोला|खोली|बताया|मिला|मिली|डाले|डाला|लगाए|कटे|कटा`);
const FUT=R('\\S+(?:unga|ungi|enge|ega|egi|oge|ogi)|kal tak|tomorrow|will|shall|going to|gonna|hoga|hogi|honge|karna hai|bhejna hai|dena hai|karne|bhejne|dene|\\S+(?:ूंगा|ूंगी|ेंगे|ेगा|ेगी|ोगे)|कल तक|होगा|होगी|करना है|भेजना है|देना है|करने|भेजने|देने');
const CH=[ // strong payment-method words first; weak hints only when nothing strong is said
 ['upi',R('upi|upi id|vpa|bhim|gpay|g pay|google pay|google pe|gpe|phonepe|phone pe se|phonepay|qr|qr code|scan|[a-z0-9._-]+@[a-z]+|यूपीआई|गूगल पे|फोनपे|फोन पे से|भीम|क्यूआर'),1],
 ['card',R('(?:\\S+ )?(?:card|cards|rupay|कार्ड)|cvv|सीवीवी'),1],
 ['bank',R('neft|rtgs|imps|net ?banking|netbanking|internet banking|bank transfer|ifsc|cheque|chq|नेट ?बैंकिंग|बैंक ट्रांसफर|आईएमपीएस|एनईएफटी|आरटीजीएस|चेक'),1],
 ['wallet',R('wallet|paytm wallet|mobikwik|freecharge|amazon pay balance|prepaid card|वॉलेट|वालेट|प्रीपेड कार्ड'),1],
 ['cash',R('cash(?! ?back)|nakad|naqad|nagad|nagdi|haath me|hath me|in person|नकद|नगद|कैश(?! ?बैक)'),1],
 ['bank',R('account (?:number )?(?:me|mein|main|pe|par|in)|(?:to|into|in) (?:his|her|their|the|a|an|another|that|some|this|company|the company) (?:bank )?account|khate (?:me|mein|main)|bank account|खाते में|अकाउंट में|बैंक खाते'),0],
 ['cash',R('crypto|bitcoin|btc|usdt|tether|ethereum|binance|gift card|gift cards|giftcard|voucher|play store card|google play card|क्रिप्टो|बिटकॉइन|गिफ्ट कार्ड'),0]
];
const NOTCARD=/^(?:sim|aadhaar|aadhar|adhar|pan|gift|voter|ration|visiting|business|sd|memory|id|identity|report|greeting|scratch|prepaid|play|store|सिम|आधार|पैन|गिफ्ट|वोटर|राशन|प्रीपेड) /;

function prep(text){
 let s=String(text);if(s.normalize)s=s.normalize('NFKC');
 const flags={hedge:false};
 s=s.toLowerCase().replace(/[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g,'').replace(/[\u0966-\u096f]/g,d=>String(d.charCodeAt(0)-0x966))
  .replace(/\u093c/g,'').replace(/\u0901/g,'\u0902').replace(/[\u2018\u2019\u201b`\u00b4]/g,"'").replace(/[\u2010-\u2015]/g,'-')
  .replace(/\b(did|do|does|have|has|had|was|were|is|are|could|would|should)n'?t\b/g,'$1 not').replace(/\bwon'?t\b/g,'will not').replace(/\bcan'?t\b/g,'can not')
  .replace(/\bo[ .-]*t[ .-]*p\b/g,'otp').replace(/\be-mail/g,'email').replace(/(\d),(?=\d)/g,'$1').replace(/(\d)\s*\/-/g,'$1')
  .replace(/\b(?:rs|inr)\.?\s*(?=\d)/g,'rs ').replace(/₹/g,' ₹ ').replace(/\ba\/c\b/g,'account')
  .replace(/\b(account|mobile|phone|upi|card|ac|ref|reference|txn|transaction|utr|order|complaint)\s*no\b\.?/g,'$1 number').replace(/\bno\.\s*(?=\d)/g,'number ')
  .replace(/([a-z\u0900-\u097f])-(?=[a-z\u0900-\u097f])/g,'$1 ')
  .replace(/\b(?:pata nahi|pata nahin|pata nhi|pta nahi|pta nhi|maloom nahi|malum nahi|not sure|no idea|do not know|unsure|shayad|i think|lagta hai|maybe)\b|पता नहीं|पता नही|मालूम नहीं|नहीं पता|शायद/g,()=>{flags.hedge=true;return ' qhedge '})
  .replace(/\b(?:no risk|koi risk nahi|risk nahi|no loss|no problem|koi dikkat nahi|koi problem nahi|nahi to|nahin to|warna|oh no|no doubt|chinta (?:mat|nahi)|tension (?:mat|nahi)|bina (?:soche|samjhe|socha|dekhe|jaane|jane|puche|pooche)|without (?:thinking|checking|verifying|knowing|reading|asking|realising|realizing)|not (?:knowing|realising|realizing|thinking))\b|बिना सोचे|बिना समझे|बिना देखे|कोई जोखिम नहीं|जोखिम नहीं|नहीं तो|वरना/g,' qx ');
 const out=[];let si=0;const parts=s.split(/([!?।॥;\n|]+|\.(?=\s|$))/);
 for(let i=0;i<parts.length;i+=2){
  const q=(parts[i+1]||'').indexOf('?')>=0;
  const list=(parts[i]||'').replace(/ (ab|kya|what|how|should|kaise|kyun|kyon|why|अब|क्या|कैसे|क्यों) /g,' , $1 ')
   .split(/,| (?:and|but|so|because|then|aur|lekin|magar|phir|fir|kyunki|kyonki|kyuki|isliye|islie|tab|और|लेकिन|मगर|फिर|क्योंकि|इसलिए|तब|तथा) /)
   .map(c=>c.replace(/[^a-z0-9\u0900-\u097f₹@.%\/ ]+/g,' ').replace(/\s+/g,' ').trim()).filter(Boolean).map(c=>' '+c+' ');
  list.forEach((c,j)=>out.push({c,s:si,q:q&&j===list.length-1}));if(list.length)si++;
 }
 return {clauses:out,flags};
}
const words=s=>s.trim()?s.trim().split(' '):[];
function negPre(c,s){const w=words(c.slice(0,s)).slice(-3);let k=w.length;while(k>0&&!has(STOP,' '+w[k-1]+' '))k--;return has(NEG,' '+w.slice(k).join(' ')+' ')}
const negated=(c,s,e)=>negPre(c,s)||has(NEG,c.slice(s,e))||has(NEGPOST,' '+words(c.slice(e)).slice(0,2).join(' ')+' ');
// Word order: a Hindi verb takes its object before it ("paise bhej diye"; directly after only in speech, "bhej diye paise");
// an English verb takes it after ("sent 5000"), or before only across helper words ("money was debited").
const ENGV=/^(?:[a-z]+ed|sent|gave|given|put|lost|cut|taken|took|stole|stolen|told|withdrawn|read out|got|get|getting|gets|came|comes|coming)$/;
const AUX=/^(?:was|were|got|has|have|had|been|is|are|be|already|also|just|all|my|the|from)$/;
function gapOf(c,v,o){
 if(o.s<v.e&&v.s<o.e)return 0;const before=o.e<=v.s,mid=words(before?c.slice(o.e,v.s):c.slice(v.e,o.s));
 if(ENGV.test(v.t))return before&&!mid.every(w=>AUX.test(w))?99:mid.length;
 return before?mid.length:mid.length?99:0;
}
function allowed(v,cond,c){
 const first=has(FIRST,c);
 if(cond==='give')return !(has(THIRD,c)&&!first)&&!(v==='paid'&&has(INCOMING,c)&&!first);
 if(cond==='fromme')return has(FROMME,c);
 if(cond==='tome'||cond==='third')return has(THIRD,c)||has(TOME,c)||(cond==='tome'&&has(INCOMING,c));
 return true;
}
// Typing a PIN into one's own UPI app approves a payment; it is not sharing, unless it went into a link or website.
const ENTRY=/^(?:entered|typed|enter|type|daal|dal|dala|daala|dale|daale|dali|daali|डाल|डाला|डाले|डाली|एंटर|टाइप)/,PINW=/^(?:pin|pins|upi pin|mpin|m pin|atm pin|पिन|एमपिन)$/;
function scan(c){
 const hits=[],pending=[],hy=all(HYPO,c).map(x=>x.s),later=s=>hy.some(p=>p<s);
 for(const [v,vk,ok,gap,cond] of PAIRS){
  const vs=all(V[vk],c);if(!vs.length)continue;
  let os=all(O[ok],c);if(ok==='money'&&has(O.cred,c))os=os.filter(o=>!/^\d+$/.test(o.t)); // digits next to an OTP are a code, not an amount
  if(!os.length){if(/^(?:give|tell|invest|open|install|buy|debit)$/.test(vk))pending.push({v,ok,cond,x:vs[0]});continue}
  for(const x of vs){let best=null;for(const o of os){const g=gapOf(c,x,o);if(g<=gap&&(!best||g<best.g))best={o,g}}
   if(!best||!allowed(v,cond,c)||v==='shared'&&ENTRY.test(x.t)&&PINW.test(best.o.t)&&!has(O.link,c))continue;
   const s=Math.min(x.s,best.o.s),e=Math.max(x.e,best.o.e);hits.push({v,s,e,t:c.slice(s,e),neg:negated(c,s,e)})}
 }
 for(const [v,re,cond] of ALONE)for(const x of all(re,c)){
  const prev=words(c.slice(0,x.s)).slice(-1)[0]||'';
  if(v==='paid'&&(/^(?:a|the|this|that|their|his|her|my|our|your|is|was|are|be|been|get|got)$/.test(prev)&&x.t==='paid'||/^(?:transfer|ट्रांसफर)/.test(x.t)&&(/^(?:call|line|कॉल)$/.test(prev)||/^(?:the |my |a )?(?:call|line)|^कॉल/.test(words(c.slice(x.e)).slice(0,2).join(' ')))))continue;
  if(!allowed(v,cond,c))continue;hits.push({v,s:x.s,e:x.e,t:x.t,neg:negated(c,x.s,x.e)});
 }
 return {hits:hits.filter(h=>!later(h.s)),pending:pending.filter(p=>!later(p.x.s)),later};
}
function chanOf(c){const out=[];for(const [id,re,strong] of CH)for(const x of all(re,c))if(!(id==='card'&&NOTCARD.test(x.t)))out.push({id,strong,t:x.t});return out}
function timeOf(c,inside){const out=[];
 for(const x of all(TODAY,c))if(inside||!has(NOWISH,' '+x.t+' '))out.push({id:'today',t:x.t});
 for(const x of all(EARLIER,c))out.push({id:'earlier',t:x.t});
 if(has(PAST,c)&&!has(FUT,c))for(const x of all(KAL,c))out.push({id:'earlier',t:x.t});
 return out}
function pick(list){const ids=[...new Set(list.map(x=>x.id))];return ids.length===1?{id:ids[0],t:list[0].t}:ids.length?{amb:true}:null}

function understandIncident(text){
 const res={situations:[],ongoing:null,channel:null,when:null,matched:[],confidence:'low',negated:[]};
 if(typeof text!=='string'||!text.trim())return res;
 const {clauses,flags}=prep(text.slice(0,3000));
 const got={},neg={},yes=[],no=[];let question=false;
 const scans=clauses.map(x=>scan(x.c));
 scans.forEach((r,i)=>{
  const {c,s,q}=clauses[i];
  // A short "maine bhej diye" borrows the object from the clause just before it in the same sentence.
  for(const p of r.pending){const prev=clauses[i-1];if(!prev||prev.s!==s||words(c).length>5||!allowed(p.v,p.cond,c))continue;
   const o=all(O[p.ok],prev.c)[0];if(o&&!negated(prev.c,o.s,o.e))r.hits.push({v:p.v,s:p.x.s,e:p.x.e,t:o.t+' … '+p.x.t,neg:negated(c,p.x.s,p.x.e)})}
  for(const h of r.hits){if(h.v==='paid'&&clauses.some(x=>x.s===s&&has(FAILED,x.c)))h.neg=true; // "payment kiya lekin fail ho gaya"
   (h.neg?neg:got)[h.v]=(h.neg?neg:got)[h.v]||[];(h.neg?neg:got)[h.v].push(Object.assign(h,{i}));if(q&&!h.neg)question=true}
  const ok=x=>!r.later(x.s)&&!negated(c,x.s,x.e);
  for(const x of all(ONGO_STILL,c))if(has(ONGO_CTX,c)&&ok(x))yes.push(x.t);
  for(const x of all(ONGO_YES,c))if(ok(x))yes.push(x.t);
  for(const x of all(ONGO_RUN,c))if(has(ONGO_RUNCTX,c)&&ok(x))yes.push(x.t);
  for(const x of all(ONGO_NO,c))if(!r.later(x.s)&&!negPre(c,x.s)&&!(/block|ब्लॉक/.test(x.t)&&has(NOTCONTACT,c)))no.push(x.t);
 });
 // Real-world user test: "I downloaded" in its own sentence, with the app named in another, still means an app was installed.
 if(!got.clicked&&!neg.clicked&&clauses.some(x=>has(O.app,x.c)))for(const [i,{c}] of clauses.entries()){const x=all(V.install,c).find(x=>!scans[i].later(x.s)&&!negated(c,x.s,x.e));if(x){got.clicked=[{v:'clicked',s:x.s,e:x.e,t:x.t,neg:false,i}];break}}
 const strong=['clicked','shared','paid'].some(v=>got[v]);
 for(const v of ['received','clicked','shared','paid'])if(got[v]&&(v!=='received'||!strong)){res.situations.push(v);res.matched.push({field:'situations',value:v,phrase:got[v][0].t.trim()})}
 for(const v of Object.keys(neg))if(!got[v])res.negated.push(v);
 const conflict=Object.keys(neg).some(v=>got[v]);
 if(yes.length){res.ongoing='yes';res.matched.push({field:'ongoing',value:'yes',phrase:yes[0]})}else if(no.length){res.ongoing='no';res.matched.push({field:'ongoing',value:'no',phrase:no[0]})}
 let amb=false;
 if(got.paid){
  const own=[...new Set(got.paid.map(h=>h.i))],sent=new Set(own.map(i=>clauses[i].s)),near=clauses.map((x,i)=>i).filter(i=>sent.has(clauses[i].s)&&own.indexOf(i)<0);
  const choose=(fn)=>{for(const scope of [own,near]){const l=[].concat(...scope.map(fn));if(l.length)return pick(l)}return null};
  const ch=choose(i=>{const l=chanOf(clauses[i].c),st=l.filter(x=>x.strong);return st.length?st:[]})||choose(i=>chanOf(clauses[i].c));
  const tm=(()=>{let l=[].concat(...own.map(i=>timeOf(clauses[i].c,true)));if(!l.length)l=[].concat(...near.map(i=>timeOf(clauses[i].c,false)));return l.length?pick(l):null})();
  if(ch&&ch.amb)amb=true;else if(ch){res.channel=ch.id;res.matched.push({field:'channel',value:ch.id,phrase:ch.t})}
  if(tm&&tm.amb)amb=true;else if(tm){res.when=tm.id;res.matched.push({field:'when',value:tm.id,phrase:tm.t})}
 }
 res.confidence=res.situations.length&&!flags.hedge&&!conflict&&!amb&&!question&&!(yes.length&&no.length)?'high':'low';
 return res;
}

// ---------- 2. Returns maths ----------
const PER={day:365,week:365/7,month:12,year:1},CAP=1000;
const unitOf=u=>{u=String(u||'').toLowerCase().replace(/s$/,'');return PER[u]?u:null};
const rnd=(x,d)=>{const f=Math.pow(10,d||0);return Math.round(x*f)/f};
function result(mult,input){const capped=!isFinite(mult)||mult>CAP,m=capped?CAP:mult;return {annualPct:rnd((m-1)*100,1),multipleYear:rnd(m,2),capped,input}}
function annualise(ratePct,period){const r=Number(ratePct),p=unitOf(period);if(ratePct===null||ratePct===''||!isFinite(r)||r<=-100||!p)return null;return result(Math.pow(1+r/100,PER[p]),{ratePct:r,period:p})}
function fromAmounts(start,end,durationValue,durationUnit){
 const a=Number(start),b=Number(end),d=Number(durationValue),u=unitOf(durationUnit);
 if(!isFinite(a)||!isFinite(b)||!isFinite(d)||a<=0||b<0||d<=0||!u)return null;
 return result(Math.pow(b/a,PER[u]/d),{start:a,end:b,durationValue:d,durationUnit:u,ratePct:rnd((Math.pow(b/a,1/d)-1)*100,2),period:u});
}
const group=n=>{const s=String(Math.round(Math.abs(n)));return (n<0?'-':'')+(s.length<=3?s:s.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+s.slice(-3))};
const dec=x=>String(rnd(x,2));
function inr(n,hi){return n>=1e7?'₹'+dec(n/1e7)+(hi?' करोड़':' crore'):n>=1e5?'₹'+dec(n/1e5)+(hi?' लाख':' lakh'):'₹'+group(n)}
const pctTxt=x=>Math.abs(x)>=100?group(x):Math.abs(x)>=10?String(Math.round(x)):String(rnd(x,Math.abs(x)<1?2:1));
const UNIT={day:['a day','हर दिन','day','दिन'],week:['a week','हर हफ़्ते','week','हफ़्ते'],month:['a month','हर महीने','month','महीने'],year:['a year','हर साल','year','साल']};
const tooHigh=r=>!!r&&(r.capped||r.annualPct>30||!!(r.input&&(r.input.period==='day'||r.input.period==='week')&&r.input.ratePct>0));
function explainReturn(r,lang){
 if(!r||!isFinite(r.annualPct))return '';
 const hi=lang==='hi',inp=r.input||{},u=UNIT[inp.period]||UNIT.year,rate=inp.ratePct!=null?String(rnd(inp.ratePct,2))+'%':null,end=r.multipleYear*1e5;
 const yearly=r.annualPct<0?(hi?`साल में ${pctTxt(-r.annualPct)}% का नुकसान`:`a loss of ${pctTxt(-r.annualPct)}% a year`):(hi?`साल में ${pctTxt(r.annualPct)}%`:`${pctTxt(r.annualPct)}% a year`);
 let lead,tail;
 if(inp.start!=null){const n=rnd(inp.durationValue,2),du=UNIT[inp.durationUnit],loss=inp.ratePct<0,p=String(rnd(Math.abs(inp.ratePct),2))+'%';
  lead=hi?`${n} ${du[3]} में ${inr(inp.start,1)} को ${inr(inp.end,1)} बनाना, यानी ${u[1]} लगभग ${p}${loss?' का नुकसान':''}। इस दर से `:`Turning ${inr(inp.start)} into ${inr(inp.end)} in ${n} ${du[2]}${n===1?'':'s'} is ${loss?'a loss of ':''}about ${p} ${u[0]}. At that rate, `;
 }else lead=rate?(hi?`${u[1]} ${rate} का मतलब है कि `:`${rate} ${u[0]} means `):'';
 if(r.capped)tail=hi?'₹1 लाख एक साल में ₹10 करोड़ से भी ज़्यादा हो जाएँगे, यानी आपके पैसे के 1,000 गुना से भी ज़्यादा।':'₹1 lakh would become more than ₹10 crore in a year: more than 1,000 times your money.';
 else{const same=inp.period==='year';tail=hi?`₹1 लाख एक साल में लगभग ${inr(end,1)} हो जाएँगे${same?'':` (${yearly})`}।`:`₹1 lakh would become about ${inr(end)} in a year${same?'':` (${yearly})`}.`}
 let s=lead+tail;if(!lead)s=hi?s:s[0].toUpperCase()+s.slice(1);
 if(tooHigh(r))s+=hi?' कोई भी असली निवेश इसका वादा नहीं कर सकता।':' No genuine investment can promise this.';
 return s;
}

// ---------- 3. payCheck: "Before you pay" ----------
// Each text cites a source id from content/sources.json; null means a general safety step (shown with the general label).
const INV=['ipo','trading-app','tips','adviser-fee','scheme','withdraw-fee','recovery-fee'],MARKET=['ipo','trading-app','tips','adviser-fee'];
const TXT={
 'withdraw-fee':['apps','A fee to withdraw or release your own money is a common scam. Do not pay.','अपना ही पैसा निकालने या छुड़ाने के लिए फ़ीस माँगना आम धोखाधड़ी है। भुगतान न करें।'],
 // Release 3.5 (judge D3): "recovery agents" ask a fee to get back lost money, old shares or dividends, or a claim.
 'recovery-fee':['iepf-claimant-faq','A fee to get back lost money, old shares, dividends or a claim is a common scam. You can claim from the IEPF yourself: no agent is needed, and none is appointed. Do not pay.','डूबा पैसा, पुराने शेयर, लाभांश या क्लेम वापस दिलाने के नाम पर फ़ीस माँगना आम धोखाधड़ी है। IEPF से दावा आप खुद कर सकते हैं: किसी एजेंट की ज़रूरत नहीं, और कोई एजेंट नियुक्त नहीं है। भुगतान न करें।'],
 'free-complaint':['rbi-ios-filing','Complaints to the RBI Ombudsman are free, and you never need an agent.','RBI लोकपाल से शिकायत मुफ़्त है, और किसी एजेंट की ज़रूरत नहीं होती।'],
 'ipo-route':['sebi-icdr-faq','In a public issue everyone applies through ASBA from their own bank account, and there is no discretion in allotment. Nobody can apply for you for a fee or promise you an allotment. Do not pay.','पब्लिक इश्यू में हर कोई अपने बैंक खाते से ASBA के ज़रिए आवेदन करता है, और आवंटन किसे मिले, यह कोई अपनी मर्ज़ी से तय नहीं करता। कोई फ़ीस लेकर आपके लिए आवेदन नहीं कर सकता, न आवंटन का वादा कर सकता है। भुगतान न करें।'],
 'person-account':['apps','Paying a person’s own account for an investment is a warning sign of fake trading-app scams. Confirm the account on the company’s official website or app first.','निवेश के लिए किसी व्यक्ति के निजी खाते में भुगतान नकली ट्रेडिंग ऐप धोखाधड़ी का संकेत है। पहले कंपनी की आधिकारिक वेबसाइट या ऐप से खाता जाँचें।'],
 'crypto-gift':[null,'Crypto and gift-card payments are very hard to trace or get back. Do not pay this way.','क्रिप्टो या गिफ़्ट कार्ड से किया भुगतान ढूँढना और वापस पाना बहुत मुश्किल है। इस तरह भुगतान न करें।'],
 'caller':['sebi-impersonation','An unexpected caller wants money, perhaps in the name of SEBI, a bank or a broker. SEBI warns that fraudsters pose as its officials and ask for payments. End the call and contact the organisation through its official website or app.','कोई अनजान कॉलर पैसे माँग रहा है, शायद SEBI, बैंक या ब्रोकर के नाम पर। SEBI चेतावनी देता है कि धोखेबाज़ उसके अधिकारी बनकर भुगतान माँगते हैं। कॉल काटें और संस्था से उसकी आधिकारिक वेबसाइट या ऐप से संपर्क करें।'],
 'group':['sebi-social-caution','SEBI warns that scamsters pull investors into WhatsApp or Telegram "VIP" or "institutional trading" groups. Profit screenshots and logos are not proof.','SEBI चेतावनी देता है कि धोखेबाज़ निवेशकों को व्हाट्सऐप या टेलीग्राम के "VIP" या "संस्थागत ट्रेडिंग" ग्रुप में खींचते हैं। मुनाफ़े के स्क्रीनशॉट और लोगो सबूत नहीं हैं।'],
 'return-too-high':['scam'],
 'guaranteed':['scam','A promise of fixed or guaranteed investment returns is a serious warning sign.','निवेश पर तय या पक्के मुनाफ़े का वादा खतरे का बड़ा संकेत है।'],
 'ipo-own':['sebi-icdr-faq','Apply for the IPO yourself through ASBA: in your own bank’s net banking, or in your broker’s app with a UPI mandate (UPI is for applications up to ₹5 lakh).','IPO के लिए खुद ASBA से आवेदन करें: अपने बैंक की नेट बैंकिंग में, या ब्रोकर के ऐप में UPI मैंडेट (UPI ऐप में रकम रोकने की मंज़ूरी) देकर (UPI ₹5 लाख तक के आवेदन के लिए है)।'],
 'official-app':['apps','Use only a trading app verified through official exchange or SEBI resources, never one from a message link.','केवल वही ट्रेडिंग ऐप इस्तेमाल करें जिसे स्टॉक एक्सचेंज या SEBI की आधिकारिक वेबसाइट पर जाँचा गया हो; संदेश के लिंक वाला ऐप कभी नहीं।'],
 'check-registration':['sebi-intermediaries','Check the registration yourself in SEBI’s official list of registered intermediaries, not through a link, certificate or number they send.','रजिस्ट्रेशन खुद SEBI की रजिस्टर्ड संस्थाओं की आधिकारिक सूची में जाँचें; उनके भेजे लिंक, प्रमाणपत्र या नंबर से नहीं।'],
 'sebi-check':['sebi-check','Before paying a broker, mutual fund, investment adviser or research analyst, verify its UPI ID, QR code or bank account on SEBI Check.','किसी ब्रोकर, म्यूचुअल फ़ंड, निवेश सलाहकार या रिसर्च एनालिस्ट को भुगतान से पहले उसकी UPI आईडी, QR कोड या बैंक खाता SEBI Check पर जाँचें।'],
 'sachet':['rbi-sachet','Check on RBI’s Sachet portal whether the entity is allowed to accept deposits, and report illegal deposit schemes there.','RBI के सचेत पोर्टल पर जाँचें कि संस्था जमा ले सकती है या नहीं, और अवैध जमा योजनाओं की शिकायत वहीं करें।'],
 'upi-not-valid':['sebi-upi-valid','SEBI-registered brokers, mutual funds, investment advisers and research analysts must give investors a UPI ID with the "@valid" handle, such as abc.brk@validhdfc. This ID does not have it, so do not pay it for an investment or advice.','SEBI में रजिस्टर्ड ब्रोकर, म्यूचुअल फ़ंड, निवेश सलाहकार और रिसर्च एनालिस्ट के लिए ज़रूरी है कि वे निवेशकों को "@valid" वाली UPI आईडी दें (आईडी में @ के बाद "valid" लिखा होता है, जैसे abc.brk@validhdfc)। इस आईडी में यह नहीं है, इसलिए निवेश या सलाह के लिए इस पर भुगतान न करें।'],
 'upi-valid':['sebi-upi-valid','This ID has the "@valid" form used by SEBI-registered intermediaries, but the form alone does not prove who owns it. Confirm it on SEBI Check, and look for the thumbs-up in a green triangle in your UPI app before paying.','इस आईडी में SEBI में रजिस्टर्ड संस्थाओं वाला "@valid" रूप है, पर केवल रूप से यह साबित नहीं होता कि यह किसकी है। भुगतान से पहले इसे SEBI Check पर पक्का करें, और अपने UPI ऐप में हरे त्रिकोण में ऊपर उठे अँगूठे (थम्स-अप) का निशान देखें।'],
 'confirm-payee':[null,'Confirm who you are paying with contact details from the company’s official website or app, not ones you were sent.','किसे भुगतान कर रहे हैं, यह कंपनी की आधिकारिक वेबसाइट या ऐप के संपर्क से पक्का करें, भेजे गए संपर्क से नहीं।'],
 'never-share':['rbi-never-ask','Never share your UPI PIN, OTP or CVV. Banks and payment services never ask for them.','अपना UPI PIN, OTP या CVV कभी न बताएँ। बैंक और भुगतान सेवाएँ इन्हें कभी नहीं माँगतीं।'],
 'report':['cyber','Already paid? Call 1930 or report at cybercrime.gov.in as soon as possible.','भुगतान कर चुके हैं? जल्द से जल्द 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट करें।'],
 'upi-invalid':[null,'This does not look like a UPI ID. Check it again before paying.','यह UPI आईडी जैसी नहीं दिखती। भुगतान से पहले इसे दोबारा जाँचें।'],
 'upi-mobile':[null,'This UPI ID is a mobile number, so it may belong to a person, not a company. ','यह UPI आईडी मोबाइल नंबर है, इसलिए यह किसी कंपनी की नहीं, व्यक्ति की हो सकती है। '],
 'upi-other':[null,'','']
};
const UPI_END=['This app checks only the format and cannot tell who owns a UPI ID. Confirm the payee through the company’s official website or app.','यह ऐप सिर्फ़ यह देखता है कि UPI आईडी किस ढंग से लिखी है; यह नहीं बता सकता कि वह किसकी है। भुगतान पाने वाले की पुष्टि कंपनी की आधिकारिक वेबसाइट या ऐप से करें।'];
function item(id,en,hi){const t=TXT[id],x={id,en:en||t[1],hi:hi||t[2],sourceId:t[0]};if(/^upi-[mo]/.test(id)){x.en+=UPI_END[0];x.hi+=UPI_END[1]}if(!t[0])x.general=true;return x}
// Shape only: never a claim that an ID is genuine.
// 'valid' = the "@valid<bank>" handle SEBI-registered intermediaries must give investors from 1 Oct 2025 (SEBI circular 2025/86).
function upiShape(id){const s=String(id).trim().toLowerCase();if(!/^[a-z0-9][a-z0-9._-]{1,255}@[a-z][a-z0-9.-]{1,63}$/.test(s))return 'invalid';if(/@valid[a-z]{2,}$/.test(s))return 'valid';return /^(?:\+?91)?[6-9]\d{9}(?:[._-]?\d{1,4})?@/.test(s)?'mobile':'other'}
const PAYS_INTERMEDIARY=['trading-app','tips','adviser-fee'];
function payCheck(input){
 const i=input&&typeof input==='object'?input:{},purpose=['ipo','trading-app','tips','adviser-fee','withdraw-fee','recovery-fee','scheme','other'].indexOf(i.purpose)>=0?i.purpose:'other',by=i.askedBy,to=i.payTo;
 const reasons=[],checks=[],inv=INV.indexOf(purpose)>=0;let returns=null,upi=null;
 if(purpose==='withdraw-fee')reasons.push(item('withdraw-fee'));
 if(purpose==='recovery-fee'){reasons.push(item('recovery-fee'));checks.push(item('free-complaint'))}
 if(purpose==='ipo'&&(by!=='own-app'||['person-account','company-account','crypto-or-gift','cash'].indexOf(to)>=0))reasons.push(item('ipo-route'));
 if(to==='person-account'&&inv&&purpose!=='withdraw-fee'&&purpose!=='recovery-fee'&&purpose!=='ipo')reasons.push(item('person-account'));
 if(to==='crypto-or-gift')reasons.push(item('crypto-gift'));
 if(by==='caller')reasons.push(item('caller'));
 if(by==='group'&&inv)reasons.push(item('group'));
 const p=i.promise;
 if(p&&typeof p==='object'){
  const r=annualise(p.ratePct,p.period);
  if(r){returns={annualPct:r.annualPct,multipleYear:r.multipleYear,capped:r.capped,en:explainReturn(r,'en'),hi:explainReturn(r,'hi')};
   if(tooHigh(r))reasons.push(item('return-too-high',returns.en,returns.hi));}
  if(p.guaranteed===true||r&&r.input.ratePct>0&&MARKET.indexOf(purpose)>=0)reasons.push(item('guaranteed'));
 }
 if(purpose==='ipo')checks.push(item('ipo-own'));
 if(purpose==='trading-app')checks.push(item('official-app'));
 if(['trading-app','tips','adviser-fee','scheme','withdraw-fee'].indexOf(purpose)>=0)checks.push(item('check-registration'));
 if(PAYS_INTERMEDIARY.indexOf(purpose)>=0)checks.push(item('sebi-check'));
 if(purpose==='scheme')checks.push(item('sachet'));
 if(purpose!=='ipo'||by!=='own-app')checks.push(item('confirm-payee'));
 // Paying a broker, adviser or analyst through a UPI ID without the "@valid" handle is a reason to stop.
 if(typeof i.upiId==='string'&&i.upiId.trim()&&PAYS_INTERMEDIARY.indexOf(purpose)>=0&&['mobile','other'].indexOf(upiShape(i.upiId))>=0)reasons.push(item('upi-not-valid'));
 if(typeof i.upiId==='string'&&i.upiId.trim()){const shape=upiShape(i.upiId),u=Object.assign(item('upi-'+shape),{id:'upi-id'});upi=Object.assign({shape},u);delete upi.id;checks.push(u)}
 checks.push(item('never-share'));
 if(reasons.length)checks.push(item('report'));
 return {verdict:reasons.length?'stop':'verify',reasons,checks,returns,upi};
}

const api={understandIncident,annualise,fromAmounts,explainReturn,payCheck,version:'1.0'};
root.SafetyAssist=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
