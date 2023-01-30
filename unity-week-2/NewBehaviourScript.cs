using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Leap;
using Leap.Unity;

public class ControllMove : MonoBehaviour
{

    Controller controller;
    float HandPalmPitch;
    float HandPalmYaw;
    float HandPalmRoll;
    float HandWristRot;
    float HandDirectionPitch;
    float pinch;
    float HandPalmDirectionRoll;
    float LeftHand;
    float RightHand;
    float DistanceBetweenHands;
    Vector VectorHandPosRight;
    Vector VectorHandPosLeft;

    void Start()
    {

    }

    void Update()
    {
        controller = new Controller();
        Frame frame = controller.Frame();
        List<Hand> hands = frame.Hands;

            if (frame.Hands.Count > 0 )
            {
            Hand firstHand = hands[0];
            Hand secondHand = hands[1];
            }

        HandPalmPitch = hands[0].PalmNormal.Pitch;
        HandPalmRoll = hands[0].PalmNormal.Roll;
        HandPalmYaw = hands[0].PalmNormal.Yaw;

        VectorHandPosRight = hands[0].PalmPosition; //position right hand
        VectorHandPosLeft = hands[1].PalmPosition; // position left hand

        DistanceBetweenHands = VectorHandPosLeft.DistanceTo(VectorHandPosRight); //distance position between hands as float

        RightHand = hands[0].PalmNormal.Roll; //clap right hand
        LeftHand = hands[1].PalmNormal.Roll; // clap left hand

        HandPalmDirectionRoll = hands[0].Direction.Roll; //stroke

        pinch = hands[0].PinchStrength; //turn radio on


        Debug.Log("RightHand: " + RightHand);
        Debug.Log("LeftHand: " + LeftHand);
        Debug.Log("Pitch: " + HandPalmPitch);
        Debug.Log("Roll: " + HandPalmRoll);
        Debug.Log("Yaw: " + HandPalmYaw);
        Debug.Log("Wrist: " + HandWristRot);
        Debug.Log("Pinch: " + pinch);
        Debug.Log("PalmdirectionRoll: " + HandPalmDirectionRoll);
        Debug.Log("RightHandPos: " + VectorHandPosRight);
        Debug.Log("RightHand: " + VectorHandDirRight);
        Debug.Log("DistanceBetween: " + DistanceBetweenHands);


        if (SwipeGesture() == true)
        {
            Debug.Log("God damn- it´s a swipe gesture");
        }
        if (TurnRadioOnGesture() == true)
        {
            Debug.Log("The Radio is on");
        }

        if (TurnRadioOffGesture() == true)
        {
            Debug.Log("The Radio is off");
        }

        if (StrokeThePetGesture() == true) 
        {
            Debug.Log("Stroking");
        }

        if (FeedThePetGesture() == true)
        {
            Debug.Log("Candy");
        }

        if (ClapGesture()==true)
        {
            Debug.Log("Clap");
        }
    }


    bool TurnRadioOnGesture()
    {
        if (((HandPalmRoll < -0.3f && HandPalmRoll > -2.8f) == true) & ((pinch > 0.95f) == true))
        {
            return true;
        }
        else return false;
    }

    bool TurnRadioOffGesture()
    {
        if (((HandPalmRoll > 0.3f && HandPalmRoll < 2.2f) == true) & ((pinch > 0.95f) == true))
        {
            return true;
        }
        else return false;
    }

    bool StrokeThePetGesture()
    {
        if (((HandPalmDirectionRoll > -2.2f && HandPalmDirectionRoll < 2.2f) == true) & ((pinch > 0.4f) == true))
        {
            return true;
        }
        else return false;
    }

    bool FeedThePetGesture()
    {
        if (((HandPalmDirectionRoll > 2f && HandPalmDirectionRoll < 2.9f) == true) & ((pinch < 0.3f) == true))
        {
            return true;
        }
        else return false;
    }

    bool SwipeGesture()
    {
        if ((((HandPalmRoll < 0.5f && HandPalmRoll > -2.8f) == true) & ((HandPalmYaw < -0.5f && HandPalmYaw > -2.6f) == true) & ((pinch > 0.3f) == true)))
        {
            return true;
        }
        else return false;
    }

    bool ClapGesture()
    {
        if (((RightHand < -0.8f && RightHand > -2.5f) == true) & ((LeftHand > 0.8f && LeftHand < 2.5f) == true) & (DistanceBetweenHands < 60) == true)
        {
            return true;
        }
        else return false;
    }
}


