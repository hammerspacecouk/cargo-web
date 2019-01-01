Generic Message via message object
```jsx
<GenericMessage message={{type:"info", message:"Some message text"}} />
```


Info Message
```jsx
<MessageInfo>Some message text</MessageInfo>
```

Also supports internal markup
```jsx
<MessageInfo>
  <p>This is an <em>info</em> message</p>
  <ul>
    <li>This should be known about</li>
    <li>And this you should also know about</li>
  </ul>
</MessageInfo>
```

Ok Message
```jsx
<MessageOk>Some message text</MessageOk>
```

Also supports internal markup
```jsx
<MessageOk>
  <p>This is an <em>ok</em> message</p>
  <ul>
    <li>This is fine</li>
    <li>And this is also fine</li>
  </ul>
</MessageOk>
```

Warning Message
```jsx
<MessageWarning>Some message text</MessageWarning>
```

Also supports internal markup
```jsx
<MessageWarning>
  <p>This is a <em>warning</em> message</p>
  <ul>
    <li>This might break</li>
    <li>And this might break</li>
  </ul>
</MessageWarning>
```

Error Message
```jsx
<MessageError>Some message text</MessageError>
```

Also supports internal markup
```jsx
<MessageError>
  <p>This is an <em>error</em> message</p>
  <ul>
    <li>This broke</li>
    <li>And this broke</li>
  </ul>
</MessageError>
```
