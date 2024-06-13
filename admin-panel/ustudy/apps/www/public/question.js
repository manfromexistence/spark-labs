let array = [
    {
        "strong": "1. In a social gathering, do you feel more energized by interacting with a large group of people or by\r\n having one-on-one conversations?"
    },
    "a) Large group interactions (E)",
    "b) One-on-one conversations (I)",
    {
        "strong": "2. How do you typically recharge after a busy day?"
    },
    "a) Spending time with friends or engaging in social activities (E)",
    "b) Having some alone time to relax and unwind (I)",
    {
        "strong": "3. When facing a challenge, do you prefer brainstorming ideas with others or working through it\r\n independently?"
    },
    "a) Brainstorming with others (E)",
    "b) Working through it independently (I)",
    {
        "strong": "4. In your free time, do you find yourself seeking out social events and gatherings or enjoying quieter\r\n activities at home?"
    },
    "a) Social events and gatherings (E)",
    "b) Quieter activities at home (I)",
    {
        "strong": "5. How do you feel about small talk?"
    },
    "a) Enjoy it and find it easy to engage in (E)",
    "b) Find it somewhat awkward or draining (I)",
    {
        "strong": "6. When making decisions, do you rely more on your own instincts and feelings or seek input from\r\n others?"
    },
    "a) Rely on own instincts and feelings (I)",
    "b) Seek input from others (E)",
    {
        "strong": "7. How do you handle new and unfamiliar situations?"
    },
    "a) Embrace them with enthusiasm (E)",
    "b) Approach them with caution (I)",
    {
        "strong": "8. In a work or team setting, do you prefer open office spaces and collaboration or individual\r\n workspaces?"
    },
    "a) Open office spaces and collaboration (E)",
    "b) Individual workspaces (I)",
    {
        "strong": "9. How do you typically respond to being the focal point in a group setting?"
    },
    "a) Embrace it and feel at ease (E)",
    "b) Prefer to avoid being the center of attention (I)",
    {
        "strong": "10. When planning a weekend, do you lean towards social plans with friends or quiet time for\r\n yourself?"
    },
    "a) Social plans with friends (E)",
    "b) Quiet time for yourself (I)",
    {
        "strong": "11. When meeting new people, are you more likely to initiate conversations and introductions or wait for\r\n others to approach you?"
    },
    "a) Initiate conversations and introductions (E)",
    "b) Wait for others to approach you (I)",
    {
        "strong": "12. When faced with a problem, do you prefer to rely on concrete facts and details or explore\r\n possibilities and potential meanings?"
    },
    "a) Rely on concrete facts and details (S)",
    "b) Explore possibilities and potential meanings (N)",
    {
        "strong": "13. How do you approach new information or learning?"
    },
    "a) Prefer practical, hands-on experiences (S)",
    "b) Enjoy exploring theories and concepts (N)",
    {
        "strong": "14. In a conversation, are you more focused on the present and current details or on future possibilities\r\n and patterns?"
    },
    "a) Present and current details (S)",
    "b) Future possibilities and patterns (N)",
    {
        "strong": "15. When planning a trip, do you prefer to have a detailed itinerary and clear schedule or leave room for\r\n spontaneous experiences and changes?"
    },
    "a) Detailed itinerary and clear schedule (S)",
    "b) Leave room for spontaneous experiences and changes (N)",
    {
        "strong": "16. How do you make decisions?"
    },
    "a) Based on practical considerations and real-world implications (S)",
    "b) Consider potential outcomes and future possibilities (N)",
    {
        "strong": "17. When working on a project, do you tend to focus on the specific tasks at hand or the overall vision\r\n and goals?"
    },
    "a) Specific tasks at hand (S)",
    "b) Overall vision and goals (N)",
    {
        "strong": "18. In a group discussion, do you prefer to stick to the facts and details or contribute ideas and\r\n theories?"
    },
    "a) Stick to facts and details (S)",
    "b) Contribute ideas and theories (N)",
    {
        "strong": "19. How do you handle unexpected changes or disruptions to your plans?"
    },
    "a) Prefer stability and may find changes challenging (S)",
    "b) Adapt well to changes and enjoy the flexibility (N)",
    {
        "strong": "20. When recalling a past event, do you focus more on the specific details and occurrences or the overall\r\n impressions and meanings?"
    },
    "a) Specific details and occurrences (S)",
    "b) Overall impressions and meanings (N)",
    {
        "strong": "21. When reading a book or watching a movie, do you pay close attention to the plot and events or look\r\n for deeper meanings and symbolism?"
    },
    "a) Plot and events (S)",
    "b) Deeper meanings and symbolism (N)",
    {
        "strong": "22. How do you prefer to receive information?"
    },
    "a) Clear and straightforward explanations (S)",
    "b) Rich with possibilities and potential connections (N)",
    {
        "strong": "23. When faced with a decision, do you rely more on your past experiences and proven methods or seek out\r\n innovative and creative solutions?"
    },
    "a) Past experiences and proven methods (S)",
    "b) Innovative and creative solutions (N)",
    {
        "strong": "24. In a brainstorming session, do you tend to come up with practical, actionable ideas or imaginative,\r\n out-of-the-box concepts?"
    },
    "a) Practical, actionable ideas (S)",
    "b) Imaginative, out-of-the-box concepts (N)",
    {
        "strong": "25. How do you approach problem-solving?"
    },
    "a) Step-by-step and methodical approach (S)",
    "b) Approaching with creativity and openness (N)",
    {
        "strong": "26. When making decisions, do you prioritize logical analysis and objective criteria or consider the\r\n impact on people and relationships?"
    },
    "a) Logical analysis and objective criteria (T)",
    "b) Consider the impact on people and relationships (F)",
    {
        "strong": "27. How do you handle criticism or feedback?"
    },
    "a) Focus on the facts and seek constructive solutions (T)",
    "b) Consider the emotional aspects and how it affects relationships (F)",
    {
        "strong": "28. When faced with a problem, do you rely more on your head and reason or your heart and\r\n empathy?"
    },
    "a) Head and reason (T)",
    "b) Heart and empathy (F)",
    {
        "strong": "29. How do you prioritize tasks and responsibilities?"
    },
    "a) Based on logical importance and efficiency (T)",
    "b) Considering the values and impact on people (F)",
    {
        "strong": "30. In a group decision-making process, do you tend to advocate for the most logical and rational choice\r\n or the one that aligns with personal values and harmony?"
    },
    "a) Logical and rational choice (T)",
    "b) Aligns with personal values and harmony (F)",
    {
        "strong": "31. When giving feedback, do you focus on providing objective analysis or consider the individual's\r\n feelings and emotional response?"
    },
    "a) Objective analysis (T)",
    "b) Consider the individual's feelings and emotional response (F)",
    {
        "strong": "32. How do you express your opinions in a debate or discussion?"
    },
    "a) Emphasize facts, evidence, and logical reasoning (T)",
    "b) Consider personal values, emotions, and the impact on people (F)",
    {
        "strong": "33. When solving a problem, do you prioritize efficiency and effectiveness, even if it means being blunt,\r\n or do you consider the feelings of those involved?"
    },
    "a) Prioritize efficiency and effectiveness (T)",
    "b) Consider the feelings of those involved (F)",
    {
        "strong": "34. In a work environment, do you value objective performance metrics and results or prioritize a\r\n positive and supportive team culture?"
    },
    "a) Objective performance metrics and results (T)",
    "b) Positive and supportive team culture (F)",
    {
        "strong": "35. How do you approach conflict resolution?"
    },
    "a) Focus on finding logical solutions and compromises (T)",
    "b) Consider the emotional needs and harmony of individuals involved (F)",
    {
        "strong": "36. When planning an event or project, do you prioritize the logical steps and timeline or consider the\r\n emotional atmosphere and team dynamics?"
    },
    "a) Logical steps and timeline (T)",
    "b) Emotional atmosphere and team dynamics (F)",
    {
        "strong": "37. How do you cope with stress or pressure?"
    },
    "a) Analyze the situation logically and strategize a plan (T)",
    "b) Seek emotional support and consider the impact on relationships (F)",
    {
        "strong": "38. When making decisions, what holds more weight for you?"
    },
    "a) Objective data and analysis (T)",
    "b) Personal values and the impact on people (F)",
    {
        "strong": "39. When providing feedback, do you prioritize offering constructive criticism and improvement\r\n suggestions or highlighting positive aspects and encouraging the individual?"
    },
    "a) Constructive criticism and improvement suggestions (T)",
    "b) Highlighting positive aspects and encouraging the individual (F)",
    {
        "strong": "40. How do you feel about making plans and sticking to a schedule?"
    },
    "a) Enjoy making plans and prefer a structured schedule (J)",
    "b) Prefer flexibility and spontaneity, dislike strict schedules (P)",
    {
        "strong": "41. When starting a project, do you prefer to have a detailed plan in place or do you like to explore\r\n possibilities and figure it out as you go?"
    },
    "a) Prefer to have a detailed plan (J)",
    "b) Like to explore possibilities and figure it out as you go (P)",
    {
        "strong": "42. How do you approach deadlines?"
    },
    "a) Work diligently to meet deadlines well in advance (J)",
    "b) Tend to work better under pressure and close to the deadline (P)",
    {
        "strong": "43. In a work setting, do you prefer a clear and organized workspace or are you comfortable with a more\r\n flexible and adaptable environment?"
    },
    "a) Prefer a clear and organized workspace (J)",
    "b) Comfortable with a more flexible and adaptable environment (P)",
    {
        "strong": "44. When packing for a trip, do you plan and make a checklist in advance or pack on the fly, throwing in\r\n what feels right at the moment?"
    },
    "a) Plan and make a checklist in advance (J)",
    "b) Pack on the fly, throwing in what feels right (P)",
    {
        "strong": "45. What do you do when your plans suddenly change?"
    },
    "a) Dislike unexpected changes and prefer to stick to the original plan (J)",
    "b) Adapt well to unexpected changes and enjoy the flexibility (P)",
    {
        "strong": "46. When faced with a new opportunity, do you prefer to consider the advantages and disadvantages prior\r\n to making a decision or go with the flow and see where it takes you ?"
    },
    "a) Consider the advantages and disadvantages prior to deciding (J)",
    "b) Go with the flow and see where it takes you (P)",
    {
        "strong": "47. How do you approach work tasks?"
    },
    "a) Like to have a set plan and follow it step by step (J)",
    "b) Enjoy being flexible and adapting as the situation evolves (P)",
    {
        "strong": "48. When organizing your day, do you prefer to have a to-do list with specific tasks and deadlines or\r\n keep it open-ended and see where the day takes you?"
    },
    "a) To-do list with specific tasks and deadlines (J)",
    "b) Keep it open-ended and see where the day takes you (P)",
    {
        "strong": "49. How do you feel about routine and predictability?"
    },
    "a) Prefer routine and find comfort in predictability (J)",
    "b) Dislike routine and enjoy spontaneity (P)",
    {
        "strong": "50. In a decision-making process, do you like to reach a conclusion and move on or prefer to keep options\r\n open and gather more information?"
    },
    "a) Like to reach a conclusion and move on (J)",
    "b) Prefer to keep options open and gather more information (P)"
]

let newArray = [];
let question = {};
let questionIndex = 1;
for(let i = 0; i < array.length; i++) {
    if(typeof array[i] === 'object') {
        question = {};
        let questionText = array[i].strong;
        questionText = questionText.replace(/^\d+\.\s/, ''); // Remove initial numbering and space
        question[questionIndex] = questionText;
    } else {
        if(array[i].startsWith('a)')) {
            question['a'] = array[i];
        } else if(array[i].startsWith('b)')) {
            question['b'] = array[i];
            newArray.push(question);
            questionIndex++;
        }
    }
}
console.log(newArray);