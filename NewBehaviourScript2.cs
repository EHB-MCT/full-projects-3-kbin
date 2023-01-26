using Leap;
using Leap.Unity;
using UnityEngine;

public class Example : MonoBehaviour
{
    void OnUpdateHand(Hand _hand)
    {
        float _grabStrength = _hand.GrabStrength;
        float _grabAngle = _hand.GrabAngle;
    }
}