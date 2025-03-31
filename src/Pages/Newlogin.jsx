import React from "react";



function newlogin(){
    return(

        <svg
        className="mySVG"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 200 200"
      >
        <defs>
          <circle id="armMaskPath" cx="100" cy="100" r="100" />
        </defs>
        <clipPath id="armMask">
          <use xlinkHref="#armMaskPath" overflow="visible" />
        </clipPath>
        <circle cx="100" cy="100" r="100" fill="#a9ddf3" />
        <g className="body">
          <path
            fill="#FFFFFF"
            d="M193.3,135.9c-5.8-8.4-15.5-13.9-26.5-13.9H151V72c0-27.6-22.4-50-50-50S51,44.4,51,72v50H32.1 c-10.6,0-20,5.1-25.8,13l0,78h187L193.3,135.9z"
          />
          <path
            fill="none"
            stroke="#3A5E77"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M193.3,135.9 c-5.8-8.4-15.5-13.9-26.5-13.9H151V72c0-27.6-22.4-50-50-50S51,44.4,51,72v50H32.1c-10.6,0-20,5.1-25.8,13"
          />
          <path
            fill="#DDF1FA"
            d="M100,156.4c-22.9,0-43,11.1-54.1,27.7c15.6,10,34.2,15.9,54.1,15.9s38.5-5.8,54.1-15.9 C143,167.5,122.9,156.4,100,156.4z"
          />
        </g>
        <g className="earL">
          <g className="outerEar" fill="#ddf1fa" stroke="#3a5e77" strokeWidth="2.5">
            <circle cx="47" cy="83" r="11.5" />
            <path
              d="M46.3 78.9c-2.3 0-4.1 1.9-4.1 4.1 0 2.3 1.9 4.1 4.1 4.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="earHair">
            <rect x="51" y="64" fill="#FFFFFF" width="15" height="35" />
            <path
              d="M53.4 62.8C48.5 67.4 45 72.2 42.8 77c3.4-.1 6.8-.1 10.1.1-4 3.7-6.8 7.6-8.2 11.6 2.1 0 4.2 0 6.3.2-2.6 4.1-3.8 8.3-3.7 12.5 1.2-.7 3.4-1.4 5.2-1.9"
              fill="#fff"
              stroke="#3a5e77"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <g className="earR">
          <g className="outerEar" fill="#ddf1fa" stroke="#3a5e77" strokeWidth="2.5">
            <circle cx="155" cy="83" r="11.5" />
            <path
              d="M155.7 78.9c2.3 0 4.1 1.9 4.1 4.1 0 2.3-1.9 4.1-4.1 4.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <g className="earHair">
            <rect x="131" y="64" fill="#FFFFFF" width="20" height="35" />
            <path
              d="M148.6 62.8c4.9 4.6 8.4 9.4 10.6 14.2-3.4-.1-6.8-.1-10.1.1 4 3.7 6.8 7.6 8.2 11.6-2.1 0-4.2 0-6.3.2 2.6 4.1 3.8 8.3 3.7 12.5-1.2-.7-3.4-1.4-5.2-1.9"
              fill="#fff"
              stroke="#3a5e77"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <path
          className="chin"
          d="M84.1 121.6c2.7 2.9 6.1 5.4 9.8 7.5l.9-4.5c2.9 2.5 6.3 4.8 10.2 6.5 0-1.9-.1-3.9-.2-5.8 3 1.2 6.2 2 9.7 2.5-.3-2.1-.7-4.1-1.2-6.1"
          fill="none"
          stroke="#3a5e77"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="face"
          fill="#DDF1FA"
          d="M134.5,46v35.5c0,21.815-15.446,39.5-34.5,39.5s-34.5-17.685-34.5-39.5V46"
        />
        <path
          className="hair"
          fill="#FFFFFF"
          stroke="#3A5E77"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M81.457,27.929 c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235 c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474"
        />
        <g className="eyebrow">
          <path
            fill="#FFFFFF"
            d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037 c-4.569-1.465-8.909-3.222-12.996-5.226c-0.98,3.075-2.07,6.137-3.267,9.179c-5.514-3.067-10.559-6.545-15.097-10.329 c-1.806,2.889-3.745,5.73-5.816,8.515c-7.916-4.124-15.053-9.114-21.296-14.738l1.107-11.768h73.475V55.064z"
          />
          <path
            fill="#FFFFFF"
            stroke="#3A5E77"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M63.56,55.102 c6.243,5.624,13.38,10.614,21.296,14.738c2.071-2.785,4.01-5.626,5.816-8.515c4.537,3.785,9.583,7.263,15.097,10.329 c-1.197-3.042-2.287-6.104-3.267-9.179c-4.087,3.004-8.427,4.761-12.996,5.226c-0.546-3.348-0.986-6.696-1.322-10.037 C138.142,57.22,133.188,56.061,128.258,54.802"
          />
        </g>
        <g className="eyeL">
          <path
            className="pupil"
            fill="#3A5E77"
            d="M116.428,64.128c-1.614,0-2.92-1.305-2.92-2.918c0-1.614,1.306-2.919,2.92-2.919 c1.613,0,2.919,1.305,2.919,2.919C119.348,62.823,118.042,64.128,116.428,64.128z"
          />
          <path
            className="eye"
            fill="#FFFFFF"
            d="M116.428,64.128c-3.133,0-5.676-2.543-5.676-5.675c0-3.133,2.543-5.676,5.676-5.676 c3.133,0,5.675,2.543,5.675,5.676C122.103,61.585,119.561,64.128,116.428,64.128z"
          />
        </g>
        <g className="eyeR">
          <path
            className="pupil"
            fill="#3A5E77"
            d="M136.714,64.128c-1.614,0-2.92-1.305-2.92-2.918c0-1.614,1.306-2.919,2.92-2.919 c1.613,0,2.919,1.305,2.919,2.919C139.633,62.823,138.327,64.128,136.714,64.128z"
          />
          <path
            className="eye"
            fill="#FFFFFF"
            d="M136.714,64.128c-3.133,0-5.676-2.543-5.676-5.675c0-3.133,2.543-5.676,5.676-5.676 c3.133,0,5.675,2.543,5.675,5.676C142.389,61.585,139.847,64.128,136.714,64.128z"
          />
        </g>
      </svg>
    
    );
}
    export default newlogin;