// Squash codes (e.g., remove spaces around operators). Programmers should rely
// on formatters and should not get used to format code by themselves.
//
// Include at least one non-alphabetic character in each sentence. The main
// purpose of this training tool is to familiarize the user with key placements
// that are different from the normal Dvorak layout.

const c = [
    'int main(void){printf("hello world");return 0;}',
    'printf("%d\n",calculate());',
    'scanf("%d %d",&x,&y);',
];

const html = [
    "<title>My website</title>",
    '<div class="container"></div>',
    "<!DOCTYPE HTML>",
];

const javascript = ['window.addEventListener("keydown",onKeyDown);'];

const haskell = [
    "{-#LANGUAGE OverloadedStrings#-}",
    "main::IO()",
    "map::(a->b)->[a]->[b]",
    "filter::(a->Bool)->[a]->[a]",
    'main=putStrLn "hello world"',
    "data Foo=Foo{bar::Int,baz::Int}deriving(Eq,Ord)",
];

const shell = ["alias emacs=vim", "sort -nr|uniq -c"];

const numbers = ["e=2.7182818284", "pi=3.1415926535", "root2=1.41421356237"];

const typingTexts = [
    ...c,
    ...html,
    ...javascript,
    ...haskell,
    ...shell,
    ...numbers,
];

export default typingTexts;